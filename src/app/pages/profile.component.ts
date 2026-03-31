import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { NotificationService } from '../core/services/notification.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="focused-page-container font-body">
      <div class="section-header">
        <h1 class="text-gradient">ملفي الشخصي</h1>
        <p>إدارة إعدادات حسابك وحجوزاتك بكل سهولة</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-10 w-full">
        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <div class="card p-8 border-glow flex flex-col items-center">
            <div class="w-24 h-24 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center text-white text-3xl font-black mb-6 shadow-glow border-4 border-background">
              {{ getInitials() }}
            </div>
            <h2 class="text-xl font-black text-foreground mb-1 font-display">{{ currentUser()?.displayName || 'المستخدم' }}</h2>
            <p class="text-muted-foreground text-xs mb-8 font-bold tracking-wider tracking-[0.1em] uppercase">{{ currentUser()?.email }}</p>

            <nav class="w-full space-y-2">
              <button
                (click)="activeTab.set('profile')"
                [class.bg-primary]="activeTab() === 'profile'"
                [class.text-white]="activeTab() === 'profile'"
                [class.shadow-glow]="activeTab() === 'profile'"
                class="w-full text-right px-5 py-3.5 rounded-xl text-muted-foreground hover:bg-secondary transition-all font-bold text-sm flex items-center gap-4"
              >
                <div class="w-2 h-2 rounded-full bg-current"></div>
                إعدادات الملف الشخصي
              </button>
              <button
                (click)="activeTab.set('bookings')"
                [class.bg-primary]="activeTab() === 'bookings'"
                [class.text-white]="activeTab() === 'bookings'"
                [class.shadow-glow]="activeTab() === 'bookings'"
                class="w-full text-right px-5 py-3.5 rounded-xl text-muted-foreground hover:bg-secondary transition-all font-bold text-sm flex items-center gap-4"
              >
                <div class="w-2 h-2 rounded-full bg-current"></div>
                حجوزاتي
              </button>
              <button
                (click)="activeTab.set('security')"
                [class.bg-primary]="activeTab() === 'security'"
                [class.text-white]="activeTab() === 'security'"
                [class.shadow-glow]="activeTab() === 'security'"
                class="w-full text-right px-5 py-3.5 rounded-xl text-muted-foreground hover:bg-secondary transition-all font-bold text-sm flex items-center gap-4"
              >
                <div class="w-2 h-2 rounded-full bg-current"></div>
                الأمان والخصوصية
              </button>
            </nav>

            <button
              (click)="logout()"
              class="w-full mt-10 btn btn-secondary py-3.5 rounded-xl text-xs uppercase tracking-widest font-black"
            >
              تسجيل الخروج
            </button>
          </div>
        </div>

        <!-- Main Content -->
        <div class="lg:col-span-3">
          <!-- Profile Tab -->
          @if (activeTab() === 'profile') {
            <div class="card p-10 animate-fadeInUp">
              <div class="mb-10">
                <h3 class="text-2xl font-black text-foreground mb-2 font-display">معلومات الحساب</h3>
                <p class="text-muted-foreground text-[15px] font-medium">قم بتحديث بياناتك الشخصية ومعلومات الاتصال</p>
              </div>

              <form [formGroup]="profileForm" (ngSubmit)="updateProfile()" class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="space-y-2">
                  <label class="text-xs font-bold text-muted-foreground uppercase tracking-widest mr-1">الاسم الأول</label>
                  <input formControlName="firstName" type="text" class="w-full input" placeholder="أدخل اسمك" />
                </div>
                <div class="space-y-2">
                  <label class="text-xs font-bold text-muted-foreground uppercase tracking-widest mr-1">اسم العائلة</label>
                  <input formControlName="lastName" type="text" class="w-full input" placeholder="أدخل اسم العائلة" />
                </div>

                <div class="space-y-2 md:col-span-2">
                  <label class="text-xs font-bold text-muted-foreground uppercase tracking-widest mr-1">البريد الإلكتروني (للقراءة فقط)</label>
                  <input formControlName="email" type="email" [disabled]="true" class="w-full input opacity-50 cursor-not-allowed" />
                </div>

                <div class="space-y-2 md:col-span-2">
                  <label class="text-xs font-bold text-muted-foreground uppercase tracking-widest mr-1">رقم الهاتف</label>
                  <input formControlName="phone" type="tel" class="w-full input" placeholder="+966 50 000 0000" />
                </div>

                <div class="md:col-span-2 pt-4">
                  <button type="submit" [disabled]="isLoading()" class="btn btn-primary px-12 py-4 rounded-xl text-sm uppercase tracking-widest font-black">
                    {{ isLoading() ? 'جاري الحفظ...' : 'حفظ التغييرات' }}
                  </button>
                </div>
              </form>
            </div>
          }

          <!-- Bookings Tab -->
          @if (activeTab() === 'bookings') {
            <div class="card p-10 animate-fadeInUp">
              <div class="mb-10">
                <h3 class="text-2xl font-black text-foreground mb-2 font-display">سجل الحجوزات</h3>
                <p class="text-muted-foreground text-[15px] font-medium">إدارة حجوزاتك الحالية والسابقة</p>
              </div>
              
              <div class="text-center py-24 border-2 border-dashed border-border rounded-[2rem] bg-secondary/20">
                <div class="text-6xl mb-6 opacity-20">🚗</div>
                <p class="text-foreground font-black text-lg font-display">لا توجد حجوزات حتى الآن</p>
                <p class="text-muted-foreground mt-2 font-medium">ابدأ باستكشاف معرضنا لحجز رحلتك القادمة</p>
                <button routerLink="/cars" class="mt-8 btn btn-primary px-8 py-3 rounded-xl text-xs uppercase font-black">استكشف السيارات</button>
              </div>
            </div>
          }

          <!-- Security Tab -->
          @if (activeTab() === 'security') {
            <div class="card p-10 animate-fadeInUp">
              <div class="mb-10">
                <h3 class="text-2xl font-black text-foreground mb-2 font-display">الأمان وكلمة المرور</h3>
                <p class="text-muted-foreground text-[15px] font-medium">قم بحماية حسابك باستخدام كلمة مرور قوية</p>
              </div>

              <form [formGroup]="securityForm" (ngSubmit)="changePassword()" class="space-y-8">
                <div class="space-y-2">
                  <label class="text-xs font-bold text-muted-foreground uppercase tracking-widest mr-1">كلمة المرور الحالية</label>
                  <input formControlName="currentPassword" type="password" class="w-full input" placeholder="••••••••" />
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div class="space-y-2">
                    <label class="text-xs font-bold text-muted-foreground uppercase tracking-widest mr-1">كلمة المرور الجديدة</label>
                    <input formControlName="newPassword" type="password" class="w-full input px-4" placeholder="••••••••" />
                  </div>
                  <div class="space-y-2">
                    <label class="text-xs font-bold text-muted-foreground uppercase tracking-widest mr-1">تأكيد كلمة المرور الجديدة</label>
                    <input formControlName="confirmPassword" type="password" class="w-full input px-4" placeholder="••••••••" />
                  </div>
                </div>

                <div class="pt-4">
                  <button type="submit" [disabled]="isLoading()" class="btn btn-primary px-12 py-4 rounded-xl text-sm uppercase tracking-widest font-black">
                    {{ isLoading() ? 'جاري التحديث...' : 'تغيير كلمة المرور' }}
                  </button>
                </div>
              </form>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  securityForm: FormGroup;
  activeTab = signal<'profile' | 'bookings' | 'favorites' | 'security'>('profile');
  isLoading = signal(false);
  currentUser = signal<any>(null);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [''],
      phone: [''],
      address: [''],
    });

    this.securityForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if(user()) {
       this.currentUser.set(user());
    }
  }

  getInitials(): string {
    const name = this.currentUser()?.displayName || 'U';
    return name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase();
  }

  updateProfile(): void {
    if (this.profileForm.valid) {
      this.isLoading.set(true);
      setTimeout(() => {
        this.notificationService.success('Profile updated successfully');
        this.isLoading.set(false);
      }, 500);
    }
  }

  changePassword(): void {
    if (this.securityForm.valid) {
      const { newPassword, confirmPassword } = this.securityForm.value;
      if (newPassword !== confirmPassword) {
        this.notificationService.error('Passwords do not match');
        return;
      }

      this.isLoading.set(true);
      setTimeout(() => {
        this.notificationService.success('Password changed successfully');
        this.securityForm.reset();
        this.isLoading.set(false);
      }, 500);
    }
  }

  async logout(): Promise<void> {
    const success = await this.authService.logout();
    if (success) {
      this.router.navigate(['/login']);
    }
  }
}
