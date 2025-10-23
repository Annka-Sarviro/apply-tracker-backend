import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  ForbiddenException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateSupportDto } from "./dto/create-support.dto";
import { UpdateSupportDto } from "./dto/update-support.dto";
import { User } from "../user/entities/user.entity";
import { Support } from "./entities/support.entity";
import { MailingService } from "src/mailing/mailing.service";

@Injectable()
export class SupportsService {
  constructor(
    @InjectRepository(Support)
    private readonly supportsRepository: Repository<Support>,
    private readonly mailingService: MailingService
  ) {}

  private sanitizeSupport(support: Support) {
    const { user, ...supportWithoutUser } = support;
    return supportWithoutUser;
  }

  async create(createSupportDto: CreateSupportDto, user: User) {
    if (!user?.id) {
      throw new BadRequestException("Invalid user");
    }
    try {
      const support = this.supportsRepository.create({
        ...createSupportDto,
        userId: user.id,
      });

      const savedSupport = await this.supportsRepository.save(support);

      await this.mailingService.sendMail({
        name: "Support Team",
        email: process.env.SMTP_USER,
        subject: `New Support Request from ${user.email}`,
        template: "support-notification",
        text: createSupportDto.text,
      });
      return this.sanitizeSupport(savedSupport);
    } catch (error) {
      throw new BadRequestException("Failed to create support");
    }
  }

  async findAll(userId: string) {
    try {
      const supports = await this.supportsRepository.find({
        where: { userId },
        order: { updatedAt: "DESC" },
        select: ["id", "name", "text", "createdAt", "updatedAt"],
      });
      return supports;
    } catch (error) {
      throw new InternalServerErrorException("Failed to fetch supports");
    }
  }

  async findOne(id: string, userId: string) {
    if (!userId) throw new BadRequestException("Invalid userId");
    if (
      !id.match(
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
      )
    ) {
      throw new BadRequestException("Invalid support ID format");
    }

    try {
      const support = await this.supportsRepository.findOne({
        where: { id, userId },
        select: ["id", "name", "text", "createdAt", "updatedAt", "userId"], // userId досить
        relations: ["user"],
      });

      if (!support) {
        throw new NotFoundException("Support not found");
      }

      if (support.user.id !== userId) {
        throw new ForbiddenException("You can only access your own supports");
      }

      return this.sanitizeSupport(support);
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }
      throw new InternalServerErrorException("Failed to fetch the support");
    }
  }

  async update(id: string, userId: string, updateSupportDto: UpdateSupportDto) {
    if (!userId) throw new BadRequestException("Invalid userId");
    if (Object.keys(updateSupportDto).length === 0) {
      throw new BadRequestException(
        "At least one field must be provided for update"
      );
    }
    try {
      const support = await this.supportsRepository.findOne({
        where: { id, userId },
      });

      if (!support) {
        throw new NotFoundException("Support not found");
      }

      Object.assign(support, updateSupportDto);
      const savedSupport = await this.supportsRepository.save(support);
      return {
        result: this.sanitizeSupport(savedSupport),
        message: "Support successfully updated",
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      if (error?.code === "23505") {
        throw new BadRequestException("A note with this name already exists");
      }
      throw new InternalServerErrorException("Failed to update note");
    }
  }

  async remove(id: string, userId: string) {
    if (!userId) throw new BadRequestException("Invalid userId");
    try {
      const support = await this.supportsRepository.findOne({
        where: { id, userId },
      });

      if (!support) {
        throw new NotFoundException("Note not found");
      }

      await this.supportsRepository.remove(support);
      return { message: "Support successfully deleted" };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }
      throw new InternalServerErrorException("Failed to delete the note");
    }
  }
}
