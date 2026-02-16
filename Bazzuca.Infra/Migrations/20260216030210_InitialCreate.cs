using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Bazzuca.Infra.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "clients",
                columns: table => new
                {
                    client_id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    user_id = table.Column<long>(type: "bigint", nullable: false),
                    name = table.Column<string>(type: "character varying(80)", maxLength: 80, nullable: false),
                    active = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("clients_pkey", x => x.client_id);
                });

            migrationBuilder.CreateTable(
                name: "social_networks",
                columns: table => new
                {
                    network_id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    client_id = table.Column<long>(type: "bigint", nullable: false),
                    network_key = table.Column<int>(type: "integer", nullable: false),
                    url = table.Column<string>(type: "character varying(180)", maxLength: 180, nullable: false),
                    user = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    password = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    active = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    access_token = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    access_secret = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("social_networks_pkey", x => x.network_id);
                    table.ForeignKey(
                        name: "fk_client_social_network",
                        column: x => x.client_id,
                        principalTable: "clients",
                        principalColumn: "client_id");
                });

            migrationBuilder.CreateTable(
                name: "posts",
                columns: table => new
                {
                    post_id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    network_id = table.Column<long>(type: "bigint", nullable: false),
                    client_id = table.Column<long>(type: "bigint", nullable: false),
                    schedule_date = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    post_type = table.Column<int>(type: "integer", nullable: false),
                    s3_key = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    title = table.Column<string>(type: "character varying(80)", maxLength: 80, nullable: false),
                    status = table.Column<int>(type: "integer", nullable: false, defaultValue: 1),
                    description = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("posts_pkey", x => x.post_id);
                    table.ForeignKey(
                        name: "fk_client_post",
                        column: x => x.client_id,
                        principalTable: "clients",
                        principalColumn: "client_id");
                    table.ForeignKey(
                        name: "fk_network_post",
                        column: x => x.network_id,
                        principalTable: "social_networks",
                        principalColumn: "network_id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_posts_client_id",
                table: "posts",
                column: "client_id");

            migrationBuilder.CreateIndex(
                name: "IX_posts_network_id",
                table: "posts",
                column: "network_id");

            migrationBuilder.CreateIndex(
                name: "IX_social_networks_client_id",
                table: "social_networks",
                column: "client_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "posts");

            migrationBuilder.DropTable(
                name: "social_networks");

            migrationBuilder.DropTable(
                name: "clients");
        }
    }
}
