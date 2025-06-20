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

    public virtual DbSet<Post> Posts { get; set; }

    public virtual DbSet<SocialNetwork> SocialNetworks { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Host=emagine-db-do-user-4436480-0.e.db.ondigitalocean.com;Port=25060;Database=bazzucasocial;Username=doadmin;Password=AVNS_akcvzXVnMkvNKaO10-O");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Post>(entity =>
        {
            entity.HasKey(e => e.PostId).HasName("posts_pkey");

            entity.ToTable("posts");

            entity.Property(e => e.PostId).HasColumnName("post_id");
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
            entity.Property(e => e.UserId).HasColumnName("user_id");

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
            entity.Property(e => e.UserId).HasColumnName("user_id");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
