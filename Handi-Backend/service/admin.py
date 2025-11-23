from django.contrib import admin
from .models import Profile, ServiceRequest, Wallet, RepresentativeTechnician

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    # Fields to display in the list view
    list_display = ('user', 'first_name', 'last_name', 'user_type', 'city', 'point', 'get_user_phone')
    
    # Fields for filtering
    list_filter = ('user_type', 'city')
    
    # Fields for searching
    search_fields = (
        'user__phone', 
        'first_name', 
        'last_name', 
        'city', 
        'address'
    )
    
    # Fields that can be edited directly in the list view
    list_editable = ('user_type', 'point')
    
    # Fields organization in the detail form
    fieldsets = (
        ('User Information', {
            'fields': ('user', 'user_type', 'get_user_phone')
        }),
        ('Personal Details', {
            'fields': ('first_name', 'last_name')
        }),
        ('Contact Details', {
            'fields': ('address', 'city')
        }),
        ('Additional Information', {
            'fields': ('bio', 'profile_picture', 'point'),
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


@admin.register(ServiceRequest)
class ServiceRequestAdmin(admin.ModelAdmin):
    list_display = (
        "id", "title", "customer", "technician", "status", "cost", "created_at"
    )
    list_filter = ("status", "created_at")
    search_fields = (
        "title",
        "description",
        "customer__user__phone",
        "technician__user__phone",
    )
    ordering = ("-created_at",)
    autocomplete_fields = ("customer", "technician")


@admin.register(Wallet)
class WalletAdmin(admin.ModelAdmin):
    list_display = ("id", "profile", "balance")
    search_fields = ("profile__user__phone",)
    ordering = ("-balance",)


@admin.register(RepresentativeTechnician)
class RepresentativeTechnicianAdmin(admin.ModelAdmin):
    list_display = ("id", "representative", "technician", "date_added")
    search_fields = (
        "representative__user__phone",
        "technician__user__phone",
    )
    ordering = ("-date_added",)
    autocomplete_fields = ("representative", "technician")
