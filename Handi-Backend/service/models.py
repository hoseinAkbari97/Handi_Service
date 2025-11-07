from django.db import models
from django.conf import settings

class Profile(models.Model):
    USER_TYPE_CHOICES = [
        ('customer', 'Customer'),
        ('technician', 'Technician'),
        ("representative", "Representative"),
    ]

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES, default='customer')
    address = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profiles/', blank=True, null=True)
    point = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.user} ({self.user_type})"
    
# A representative manages multiple technicians
class RepresentativeTechnician(models.Model):
    representative = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        related_name="technician_links",
        limit_choices_to={"user_type": "representative"},
    )
    technician = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        related_name="representative_links",
        limit_choices_to={"user_type": "technician"},
    )

    date_added = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("representative", "technician")

    def __str__(self):
        return f"{self.technician.user.phone} → {self.representative.user.phone}"


# Service request 
class ServiceRequest(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("assigned", "Assigned"),
        ("in_progress", "In Progress"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
    ]

    customer = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        related_name="requests",
        limit_choices_to={"user_type": "customer"},
    )
    technician = models.ForeignKey(
        Profile,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="assigned_requests",
        limit_choices_to={"user_type": "technician"},
    )
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    cost = models.PositiveIntegerField(default=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.customer.user.phone})"


# Wallet for the customer
class Wallet(models.Model):
    profile = models.OneToOneField(
        Profile,
        on_delete=models.CASCADE,
        related_name="wallet",
        limit_choices_to={"user_type": "customer"},
    )
    balance = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.profile.user.phone} - {self.balance} "
