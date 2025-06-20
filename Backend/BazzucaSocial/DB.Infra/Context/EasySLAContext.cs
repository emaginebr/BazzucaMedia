using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace DB.Infra.Context;

public partial class EasySLAContext : DbContext
{
    public EasySLAContext()
    {
    }

    public EasySLAContext(DbContextOptions<EasySLAContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Company> Companies { get; set; }

    public virtual DbSet<CompanyPriority> CompanyPriorities { get; set; }

    public virtual DbSet<CompanyTag> CompanyTags { get; set; }

    public virtual DbSet<CompanyUser> CompanyUsers { get; set; }

    public virtual DbSet<Task> Tasks { get; set; }

    public virtual DbSet<TaskAttachment> TaskAttachments { get; set; }

    public virtual DbSet<TaskComment> TaskComments { get; set; }

    public virtual DbSet<TaskLog> TaskLogs { get; set; }

    public virtual DbSet<TaskTag> TaskTags { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Host=emagine-db-do-user-4436480-0.e.db.ondigitalocean.com;Port=25060;Database=easysla;Username=doadmin;Password=AVNS_akcvzXVnMkvNKaO10-O");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Company>(entity =>
        {
            entity.HasKey(e => e.CompanyId).HasName("companies_pkey");

            entity.ToTable("companies");

            entity.Property(e => e.CompanyId).HasColumnName("company_id");
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(80)
                .HasColumnName("name");
            entity.Property(e => e.Plan)
                .HasDefaultValue(1)
                .HasColumnName("plan");
            entity.Property(e => e.SlaMin)
                .HasDefaultValue(0)
                .HasColumnName("sla_min");
            entity.Property(e => e.Status)
                .HasDefaultValue(1)
                .HasColumnName("status");
        });

        modelBuilder.Entity<CompanyPriority>(entity =>
        {
            entity.HasKey(e => e.PriorityId).HasName("company_priorities_pkey");

            entity.ToTable("company_priorities");

            entity.Property(e => e.PriorityId).HasColumnName("priority_id");
            entity.Property(e => e.Color)
                .IsRequired()
                .HasMaxLength(7)
                .IsFixedLength()
                .HasColumnName("color");
            entity.Property(e => e.CompanyId).HasColumnName("company_id");
            entity.Property(e => e.FulfillTime)
                .HasDefaultValue(0)
                .HasColumnName("fulfill_time");
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(80)
                .HasColumnName("name");

            entity.HasOne(d => d.Company).WithMany(p => p.CompanyPriorities)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_company_priorities");
        });

        modelBuilder.Entity<CompanyTag>(entity =>
        {
            entity.HasKey(e => e.TagId).HasName("company_tags_pkey");

            entity.ToTable("company_tags");

            entity.Property(e => e.TagId).HasColumnName("tag_id");
            entity.Property(e => e.Color)
                .IsRequired()
                .HasMaxLength(7)
                .IsFixedLength()
                .HasColumnName("color");
            entity.Property(e => e.CompanyId).HasColumnName("company_id");
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(60)
                .HasColumnName("name");

            entity.HasOne(d => d.Company).WithMany(p => p.CompanyTags)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_tag_company");
        });

        modelBuilder.Entity<CompanyUser>(entity =>
        {
            entity.HasKey(e => e.CuserId).HasName("company_users_pkey");

            entity.ToTable("company_users");

            entity.Property(e => e.CuserId).HasColumnName("cuser_id");
            entity.Property(e => e.CompanyId).HasColumnName("company_id");
            entity.Property(e => e.InviteHash)
                .HasMaxLength(180)
                .HasColumnName("invite_hash");
            entity.Property(e => e.Profile)
                .HasDefaultValue(0)
                .HasColumnName("profile");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Company).WithMany(p => p.CompanyUsers)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_company_users");
        });

        modelBuilder.Entity<Task>(entity =>
        {
            entity.HasKey(e => e.TaskId).HasName("tasks_pkey");

            entity.ToTable("tasks");

            entity.Property(e => e.TaskId).HasColumnName("task_id");
            entity.Property(e => e.CompanyId).HasColumnName("company_id");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("created_at");
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(300)
                .HasColumnName("name");
            entity.Property(e => e.PriorityId).HasColumnName("priority_id");
            entity.Property(e => e.Status)
                .HasDefaultValue(1)
                .HasColumnName("status");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.Company).WithMany(p => p.Tasks)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_task_company");

            entity.HasOne(d => d.Priority).WithMany(p => p.Tasks)
                .HasForeignKey(d => d.PriorityId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_task_priority");
        });

        modelBuilder.Entity<TaskAttachment>(entity =>
        {
            entity.HasKey(e => e.AttachmentId).HasName("task_attachments_pkey");

            entity.ToTable("task_attachments");

            entity.Property(e => e.AttachmentId).HasColumnName("attachment_id");
            entity.Property(e => e.CommentId).HasColumnName("comment_id");
            entity.Property(e => e.Filename)
                .IsRequired()
                .HasMaxLength(255)
                .HasColumnName("filename");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Comment).WithMany(p => p.TaskAttachments)
                .HasForeignKey(d => d.CommentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_attachment_comment");
        });

        modelBuilder.Entity<TaskComment>(entity =>
        {
            entity.HasKey(e => e.CommentId).HasName("task_comments_pkey");

            entity.ToTable("task_comments");

            entity.Property(e => e.CommentId).HasColumnName("comment_id");
            entity.Property(e => e.Comment)
                .IsRequired()
                .HasColumnName("comment");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("created_at");
            entity.Property(e => e.TaskId).HasColumnName("task_id");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("updated_at");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Task).WithMany(p => p.TaskComments)
                .HasForeignKey(d => d.TaskId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_comment_task");
        });

        modelBuilder.Entity<TaskLog>(entity =>
        {
            entity.HasKey(e => e.LogId).HasName("task_logs_pkey");

            entity.ToTable("task_logs");

            entity.Property(e => e.LogId).HasColumnName("log_id");
            entity.Property(e => e.CommentId).HasColumnName("comment_id");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("created_at");
            entity.Property(e => e.Message)
                .IsRequired()
                .HasMaxLength(300)
                .HasColumnName("message");
            entity.Property(e => e.TaskId).HasColumnName("task_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Comment).WithMany(p => p.TaskLogs)
                .HasForeignKey(d => d.CommentId)
                .HasConstraintName("fk_log_comment");

            entity.HasOne(d => d.Task).WithMany(p => p.TaskLogs)
                .HasForeignKey(d => d.TaskId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_log_task");
        });

        modelBuilder.Entity<TaskTag>(entity =>
        {
            entity.HasKey(e => e.TtagId).HasName("task_tags_pkey");

            entity.ToTable("task_tags");

            entity.Property(e => e.TtagId).HasColumnName("ttag_id");
            entity.Property(e => e.TagId).HasColumnName("tag_id");
            entity.Property(e => e.TaskId).HasColumnName("task_id");

            entity.HasOne(d => d.Tag).WithMany(p => p.TaskTags)
                .HasForeignKey(d => d.TagId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_task_tag_company");

            entity.HasOne(d => d.Task).WithMany(p => p.TaskTags)
                .HasForeignKey(d => d.TaskId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_task_tag_task");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
