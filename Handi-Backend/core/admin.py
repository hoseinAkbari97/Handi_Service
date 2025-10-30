from django.contrib import admin
from django import forms
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import CustomUser


class CustomUserCreationForm(forms.ModelForm):
    """Form for creating new users (no password required)."""

    class Meta:
        model = CustomUser
        fields = ("phone", "first_name", "last_name", "is_staff", "is_active")

    def save(self, commit=True):
        user = super().save(commit=False)
        # No password, since OTP login is used
        user.set_unusable_password()
        if commit:
            user.save()
        return user


class CustomUserChangeForm(forms.ModelForm):
    """Form for updating existing users."""

    class Meta:
        model = CustomUser
        fields = ("phone", "first_name", "last_name", "is_staff", "is_active", "is_superuser")


@admin.register(CustomUser)
class CustomUserAdmin(BaseUserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser

    list_display = ("phone", "first_name", "last_name", "is_staff", "is_active", "date_joined")
    list_filter = ("is_staff", "is_active", "date_joined")
    search_fields = ("phone", "first_name", "last_name")
    ordering = ("-date_joined",)

    fieldsets = (
        (None, {"fields": ("phone",)}),
        ("Personal Info", {"fields": ("first_name", "last_name")}),
        (
            "Permissions",
            {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")},
        ),
        ("Important Dates", {"fields": ("last_login", "date_joined")}),
    )

    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("phone", "first_name", "last_name", "is_staff", "is_active"),
        }),
    )

    def get_form(self, request, obj=None, **kwargs):
        """Remove password field in both add and change forms."""
        form = super().get_form(request, obj, **kwargs)
        form.base_fields.pop("password", None)
        return form
