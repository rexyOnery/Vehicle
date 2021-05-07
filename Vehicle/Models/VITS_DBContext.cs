using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace Vehicle.Models
{
    public partial class VITS_DBContext : DbContext
    {
        public VITS_DBContext()
        {
        }

        public VITS_DBContext(DbContextOptions<VITS_DBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Agent> Agents { get; set; }
        public virtual DbSet<Payment> Payments { get; set; }
        public virtual DbSet<Vitsitem> Vitsitems { get; set; }
        public virtual DbSet<Vitsuser> Vitsusers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=DESKTOP-14JRCP5;Database=VITS_DB;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Latin1_General_CI_AS");

            modelBuilder.Entity<Agent>(entity =>
            {
                entity.Property(e => e.Admin).HasMaxLength(50);

                entity.Property(e => e.ConfirmationCode).HasMaxLength(50);

                entity.Property(e => e.FirstName).HasMaxLength(50);

                entity.Property(e => e.LastName).HasMaxLength(50);

                entity.Property(e => e.LoginName).HasMaxLength(50);

                entity.Property(e => e.Password).HasMaxLength(50);

                entity.Property(e => e.Phone).HasMaxLength(50);

                entity.Property(e => e.Photo).HasMaxLength(50);
            });

            modelBuilder.Entity<Payment>(entity =>
            {
                entity.Property(e => e.Amount).HasMaxLength(50);

                entity.Property(e => e.DatePaid).HasMaxLength(50);

                entity.HasOne(d => d.Agent)
                    .WithMany(p => p.Payments)
                    .HasForeignKey(d => d.AgentId)
                    .HasConstraintName("FK_Payments_Agents");
            });

            modelBuilder.Entity<Vitsitem>(entity =>
            {
                entity.ToTable("VITSItems");

                entity.Property(e => e.AgentMonth).HasMaxLength(50);

                entity.Property(e => e.ChasisNumber).HasMaxLength(50);

                entity.Property(e => e.ItemType).HasMaxLength(50);

                entity.Property(e => e.Photo).HasMaxLength(50);

                entity.Property(e => e.PlateNumber).HasMaxLength(50);

                entity.Property(e => e.RegisteredDate).HasMaxLength(50);

                entity.Property(e => e.TagNumber).HasMaxLength(50);

                entity.Property(e => e.VitsuserId).HasColumnName("VITSUserId");

                entity.HasOne(d => d.Vitsuser)
                    .WithMany(p => p.Vitsitems)
                    .HasForeignKey(d => d.VitsuserId)
                    .HasConstraintName("FK_VITSItems_VITSUsers");
            });

            modelBuilder.Entity<Vitsuser>(entity =>
            {
                entity.ToTable("VITSUsers");

                entity.Property(e => e.Address).HasMaxLength(50);

                entity.Property(e => e.City).HasMaxLength(50);

                entity.Property(e => e.FirstName).HasMaxLength(50);

                entity.Property(e => e.LastName).HasMaxLength(50);

                entity.Property(e => e.Phone).HasMaxLength(50);

                entity.Property(e => e.Pix).HasMaxLength(50);

                entity.Property(e => e.State).HasMaxLength(50);

                entity.HasOne(d => d.Agent)
                    .WithMany(p => p.Vitsusers)
                    .HasForeignKey(d => d.AgentId)
                    .HasConstraintName("FK_VITSUsers_Agents");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
