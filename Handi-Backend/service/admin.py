from django.contrib import admin
from .models import Profile

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    # Fields to display in the list view
    list_display = ('user', 'user_type', 'city', 'get_user_phone')
    
    # Fields for filtering
    list_filter = ('user_type', 'city')
    
    # Fields for searching
    search_fields = ('user__phone', 'user__first_name', 'user__last_name', 'city', 'address')
    
    # Fields that can be edited directly in the list view
    list_editable = ('user_type',)
    
    # Fields organization in the detail form
    fieldsets = (
        ('User Information', {
            'fields': ('user', 'user_type', 'get_user_phone')
        }),
        ('Contact Details', {
            'fields': ('address', 'city')
        }),
        ('Additional Information', {
            'fields': ('bio',),
            'classes': ('collapse',)
        }),
    )
    
    # Read-only fields
    readonly_fields = ('get_user_phone',)
    
    # Custom method to display user's phone in admin
    def get_user_phone(self, obj):
        return obj.user.phone
    get_user_phone.short_description = 'User Phone'
    
    # Adding some useful admin actions
    actions = ['make_technician', 'make_customer']
    
    def make_technician(self, request, queryset):
        updated = queryset.update(user_type='technician')
        self.message_user(request, f'{updated} profiles were successfully marked as technicians.')
    make_technician.short_description = "Mark selected profiles as Technician"
    
    def make_customer(self, request, queryset):
        updated = queryset.update(user_type='customer')
        self.message_user(request, f'{updated} profiles were successfully marked as customers.')
    make_customer.short_description = "Mark selected profiles as Customer"
