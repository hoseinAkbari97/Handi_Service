from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import CustomUser

@admin.register(CustomUser)
class UserAdmin(BaseUserAdmin):
    # Fields to display in the list view
    list_display = ('phone', 'first_name', 'last_name', 'is_staff', 'is_active', 'date_joined')
    
    # Fields for filtering in the right sidebar
    list_filter = ('is_staff', 'is_active', 'date_joined')
    
    # Fields for searching
    search_fields = ('phone', 'first_name', 'last_name')
    
    # Ordering
    ordering = ('-date_joined',)
    
    # Field organization in edit form - remove password field
    fieldsets = (
        (None, {'fields': ('phone',)}),
        ('Personal Info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important Dates', {'fields': ('last_login', 'date_joined')}),
    )
    
    # Field organization in create form - remove password fields
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('phone', 'first_name', 'last_name', 'is_staff', 'is_active'),
        }),
    )
    
    # Remove password from the form entirely since we use OTP
    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        # Remove the password field if it exists in the form
        if 'password' in form.base_fields:
            del form.base_fields['password']
        return form