using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    public partial class Init1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comment_Comment_ParentConmmentId",
                table: "Comment");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductVoucher_Voucher_VoucherId",
                table: "ProductVoucher");

            migrationBuilder.DropForeignKey(
                name: "FK_Voucher_AspNetUsers_UserId",
                table: "Voucher");

            migrationBuilder.DropForeignKey(
                name: "FK_Voucher_Invoice_InvoiceId",
                table: "Voucher");

            migrationBuilder.DropIndex(
                name: "IX_Voucher_InvoiceId",
                table: "Voucher");

            migrationBuilder.DropIndex(
                name: "IX_Voucher_UserId",
                table: "Voucher");

            migrationBuilder.DropIndex(
                name: "IX_ProductVoucher_VoucherId",
                table: "ProductVoucher");

            migrationBuilder.DropIndex(
                name: "IX_Comment_ParentConmmentId",
                table: "Comment");

            migrationBuilder.DropColumn(
                name: "InvoiceId",
                table: "Voucher");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Voucher");

            migrationBuilder.DropColumn(
                name: "VoucherId",
                table: "ProductVoucher");

            migrationBuilder.DropColumn(
                name: "ParentConmmentId",
                table: "Comment");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Category");

            migrationBuilder.DropColumn(
                name: "TotalPice",
                table: "Cart");

            migrationBuilder.RenameColumn(
                name: "TotalAmount",
                table: "Invoice",
                newName: "TotalPrice");

            migrationBuilder.AddColumn<int>(
                name: "VoucherId",
                table: "Invoice",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "UrlImage",
                table: "Image",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Invoice_VoucherId",
                table: "Invoice",
                column: "VoucherId");

            migrationBuilder.CreateIndex(
                name: "IX_Comment_ParentCommentId",
                table: "Comment",
                column: "ParentCommentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comment_Comment_ParentCommentId",
                table: "Comment",
                column: "ParentCommentId",
                principalTable: "Comment",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Invoice_Voucher_VoucherId",
                table: "Invoice",
                column: "VoucherId",
                principalTable: "Voucher",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comment_Comment_ParentCommentId",
                table: "Comment");

            migrationBuilder.DropForeignKey(
                name: "FK_Invoice_Voucher_VoucherId",
                table: "Invoice");

            migrationBuilder.DropIndex(
                name: "IX_Invoice_VoucherId",
                table: "Invoice");

            migrationBuilder.DropIndex(
                name: "IX_Comment_ParentCommentId",
                table: "Comment");

            migrationBuilder.DropColumn(
                name: "VoucherId",
                table: "Invoice");

            migrationBuilder.DropColumn(
                name: "UrlImage",
                table: "Image");

            migrationBuilder.RenameColumn(
                name: "TotalPrice",
                table: "Invoice",
                newName: "TotalAmount");

            migrationBuilder.AddColumn<int>(
                name: "InvoiceId",
                table: "Voucher",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Voucher",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "VoucherId",
                table: "ProductVoucher",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ParentConmmentId",
                table: "Comment",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Category",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<decimal>(
                name: "TotalPice",
                table: "Cart",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.CreateIndex(
                name: "IX_Voucher_InvoiceId",
                table: "Voucher",
                column: "InvoiceId");

            migrationBuilder.CreateIndex(
                name: "IX_Voucher_UserId",
                table: "Voucher",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductVoucher_VoucherId",
                table: "ProductVoucher",
                column: "VoucherId");

            migrationBuilder.CreateIndex(
                name: "IX_Comment_ParentConmmentId",
                table: "Comment",
                column: "ParentConmmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comment_Comment_ParentConmmentId",
                table: "Comment",
                column: "ParentConmmentId",
                principalTable: "Comment",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductVoucher_Voucher_VoucherId",
                table: "ProductVoucher",
                column: "VoucherId",
                principalTable: "Voucher",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Voucher_AspNetUsers_UserId",
                table: "Voucher",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Voucher_Invoice_InvoiceId",
                table: "Voucher",
                column: "InvoiceId",
                principalTable: "Invoice",
                principalColumn: "Id");
        }
    }
}
