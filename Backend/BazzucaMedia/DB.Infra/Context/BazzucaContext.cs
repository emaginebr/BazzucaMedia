using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace DB.Infra.Context;

public partial class BazzucaContext : DbContext
{
    public BazzucaContext()
    {
    }

    public BazzucaContext(DbContextOptions<BazzucaContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Client> Clients { get; set; }

    public virtual DbSet<Post> Posts { get; set; }

    public virtual DbSet<SocialNetwork> SocialNetworks { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Client>(entity =>
        {
            entity.HasKey(e => e.ClientId).HasName("clients_pkey");

            entity.ToTable("clients");

            entity.Property(e => e.ClientId).HasColumnName("client_id");
            entity.Property(e => e.Active)
                .HasDefaultValue(true)
                .HasColumnName("active");
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(80)
                .HasColumnName("name");
            entity.Property(e => e.UserId).HasColumnName("user_id");
        });

        modelBuilder.Entity<Post>(entity =>
        {
            entity.HasKey(e => e.PostId).HasName("posts_pkey");

            entity.ToTable("posts");

            entity.Property(e => e.PostId).HasColumnName("post_id");
            entity.Property(e => e.ClientId).HasColumnName("client_id");
            entity.Property(e => e.Description)
                .IsRequired()
                .HasColumnName("description");
            entity.Property(e => e.NetworkId).HasColumnName("network_id");
            entity.Property(e => e.PostType).HasColumnName("post_type");
            entity.Property(e => e.S3Key)
                .IsRequired()
                .HasMaxLength(255)
                .HasColumnName("s3_key");
            entity.Property(e => e.ScheduleDate)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("schedule_date");
            entity.Property(e => e.Status)
                .HasDefaultValue(1)
                .HasColumnName("status");
            entity.Property(e => e.Title)
                .IsRequired()
                .HasMaxLength(80)
                .HasColumnName("title");

            entity.HasOne(d => d.Client).WithMany(p => p.Posts)
                .HasForeignKey(d => d.ClientId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_client_post");

            entity.HasOne(d => d.Network).WithMany(p => p.Posts)
                .HasForeignKey(d => d.NetworkId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_network_post");
        });

        modelBuilder.Entity<SocialNetwork>(entity =>
        {
            entity.HasKey(e => e.NetworkId).HasName("social_networks_pkey");

            entity.ToTable("social_networks");

            entity.Property(e => e.NetworkId).HasColumnName("network_id");
            entity.Property(e => e.AccessSecret)
                .HasMaxLength(255)
                .HasColumnName("access_secret");
            entity.Property(e => e.AccessToken)
                .HasMaxLength(255)
                .HasColumnName("access_token");
            entity.Property(e => e.Active)
                .HasDefaultValue(true)
                .HasColumnName("active");
            entity.Property(e => e.ClientId).HasColumnName("client_id");
            entity.Property(e => e.NetworkKey).HasColumnName("network_key");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasColumnName("password");
            entity.Property(e => e.Url)
                .IsRequired()
                .HasMaxLength(180)
                .HasColumnName("url");
            entity.Property(e => e.User)
                .HasMaxLength(255)
                .HasColumnName("user");

            entity.HasOne(d => d.Client).WithMany(p => p.SocialNetworks)
                .HasForeignKey(d => d.ClientId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_client_social_network");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
