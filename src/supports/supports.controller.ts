import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from "@nestjs/common";

import { CreateSupportDto } from "./dto/create-support.dto";
import { UpdateSupportDto } from "./dto/update-support.dto";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { Support } from "./entities/support.entity";
import { UUIDValidationPipe } from "../common/pipes/uuid-validation.pipe";
import { SupportsService } from "./supports.service";

@ApiTags("Supports")
@ApiBearerAuth("access-token")
@UseGuards(JwtAuthGuard)
@Controller("supports")
export class SupportsController {
  constructor(private readonly supportsService: SupportsService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new support",
    description: "Creates a new support for the authenticated user",
  })
  @ApiResponse({
    status: 201,
    description: "Support successfully created",
    type: Support,
  })
  create(@Request() req, @Body() createSupportDto: CreateSupportDto) {
    return this.supportsService.create(createSupportDto, req.user);
  }

  @Get()
  @ApiOperation({
    summary: "Get all supports",
    description: "Returns all supports for the authenticated user",
  })
  @ApiResponse({
    status: 200,
    description: "Returns all supports",
    type: [Support],
  })
  findAll(@Request() req) {
    return this.supportsService.findAll(req.user.id);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a support by id",
    description:
      "Returns a specific support if it belongs to the authenticated user",
  })
  @ApiResponse({
    status: 200,
    description: "Returns the support",
    type: Support,
  })
  @ApiResponse({
    status: 400,
    description: "Invalid UUID format",
  })
  @ApiParam({
    name: "id",
    description: "Support ID",
    type: "string",
    format: "uuid",
  })
  findOne(@Param("id", UUIDValidationPipe) id: string, @Request() req) {
    return this.supportsService.findOne(id, req.user.id);
  }

  // @Patch(":id")
  // @ApiOperation({
  //   summary: "Update a support",
  //   description: "Updates a support if it belongs to the authenticated user",
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: "Support successfully updated",
  //   type: Support,
  // })
  // @ApiResponse({
  //   status: 400,
  //   description: "Invalid UUID format",
  // })
  // @ApiParam({
  //   name: "id",
  //   description: "Support ID",
  //   type: "string",
  //   format: "uuid",
  // })
  // update(
  //   @Param("id", UUIDValidationPipe) id: string,
  //   @Request() req,
  //   @Body() updateNoteDto: UpdateSupportDto
  // ) {
  //   return this.supportsService.update(id, req.user.id, updateNoteDto);
  // }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a support",
    description: "Deletes a support if it belongs to the authenticated user",
  })
  @ApiResponse({
    status: 200,
    description: "Support successfully deleted",
  })
  @ApiResponse({
    status: 400,
    description: "Invalid UUID format",
  })
  @ApiParam({
    name: "id",
    description: "Support ID",
    type: "string",
    format: "uuid",
  })
  remove(@Param("id", UUIDValidationPipe) id: string, @Request() req) {
    return this.supportsService.remove(id, req.user.id);
  }
}
