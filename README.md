# سامانه مدیریت سلامت - Health Management System

یک اپلیکیشن مدرن و کامل برای مدیریت بیماران با رابط کاربری فارسی و راست‌چین

## 📋 فهرست مطالب

- [معرفی پروژه](#معرفی-پروژه)
- [ویژگی‌ها](#ویژگیها)
- [تکنولوژی‌ها](#تکنولوژیها)
- [ساختار پروژه](#ساختار-پروژه)
- [نصب و راه‌اندازی](#نصب-و-راهاندازی)
- [اسکریپت‌ها](#اسکریپتها)
- [API Routes](#api-routes)
- [کامپوننت‌ها](#کامپوننتها)
- [State Management](#state-management)
- [استایل‌ها](#استایلها)
- [Deployment](#deployment)
- [توسعه‌دهندگان](#توسعهدهندگان)

## 🏥 معرفی پروژه

سامانه مدیریت سلامت یک اپلیکیشن تحت وب مدرن است که با **Next.js** توسعه داده شده و امکان مدیریت کامل اطلاعات بیماران را فراهم می‌کند. این پروژه با تمرکز بر تجربه کاربری فارسی و راست‌چین طراحی شده است.

### 🎯 اهداف پروژه

- ایجاد سیستم مدیریت بیماران با قابلیت‌های کامل CRUD
- طراحی رابط کاربری مدرن و ریسپانسیو
- پیاده‌سازی احراز هویت امن با JWT
- ارائه تجربه کاربری بهینه برای کاربران فارسی‌زبان

## ✨ ویژگی‌ها

### 🔐 سیستم احراز هویت

- **لاگین امن**: دریافت توکن JWT از API ساماتب
- **مدیریت توکن**: ذخیره خودکار توکن در localStorage
- **Route Protection**: محافظت از مسیرهای حساس
- **خروج ایمن**: حذف توکن و بازگشت به صفحه اصلی

### 👥 مدیریت بیماران (CRUD کامل)

- **ایجاد**: افزودن بیمار جدید با اعتبارسنجی پیشرفته
- **مشاهده**: نمایش لیست بیماران با pagination
- **ویرایش**: به‌روزرسانی اطلاعات بیماران
- **حذف**: حذف امن با تأیید کاربر

### 🎨 رابط کاربری پیشرفته

- **طراحی Material Design**: با کامپوننت‌های MUI
- **پشتیبانی RTL**: راست‌چین کامل برای فارسی
- **فونت Vazirmatn**: فونت بهینه‌شده برای فارسی
- **حالت تاریک/روشن**: قابلیت تغییر تم
- **ریسپانسیو**: سازگار با تمام دستگاه‌ها

### ⚡ تجربه کاربری

- **لودینگ هوشمند**: نمایش وضعیت بارگذاری زیبا
- **اعتبارسنجی Real-time**: اعتبارسنجی بلادرنگ فرم‌ها
- **پیام‌های تعاملی**: Snackbar برای اطلاع‌رسانی
- **مدیریت خطا**: نمایش خطاهای کاربرپسند

## 🛠 تکنولوژی‌ها

### Frontend

- **Next.js 15.5.6** - فریم‌ورک React
- **React 19.1.0** - کتابخانه اصلی
- **Material-UI 7.3.4** - کامپوننت‌های UI
- **Tailwind CSS 3.4.18** - استایل‌دهی
- **Redux Toolkit 2.9.1** - مدیریت state
- **Axios 1.12.2** - درخواست‌های HTTP

### Development

- **Emotion** - استایل‌دهی CSS-in-JS
- **PostCSS** - پردازش CSS
- **Autoprefixer** - پشتیبانی مرورگرها

### Font

- **Vazirmatn** - فونت فارسی بهینه

## 📁 ساختار پروژه

```
sama-prj/
├── 📁 components/
│   ├── 📁 layout/
│   │   ├── Layout.js          # Layout اصلی (Header + Sidebar + Main)
│   │   ├── Header.js          # هدر با منوی کاربر و دکمه تغییر تم
│   │   ├── HomeHeader.js      # هدر مخصوص صفحه اصلی
│   │   ├── Sidebar.js         # سایدبار با منوی مدیریت بیماران
│   │   └── DashboardLoading.jsx # کامپوننت لودینگ داشبورد
│   │
│   └── 📁 patient/
│       ├── PatientTable.jsx   # جدول نمایش بیماران (CRUD)
│       ├── PatientForm.jsx    # فرم افزودن/ویرایش بیمار
│       ├── PatientViewModal.jsx # مودال مشاهده اطلاعات بیمار
│       └── RouteGuard.jsx     # محافظت از مسیرها
│
├── 📁 contexts/
│   └── ThemeContext.jsx       # مدیریت تم تاریک/روشن
│
├── 📁 pages/
│   ├── index.jsx              # صفحه اصلی (ورود به سیستم)
│   ├── 404.jsx               # صفحه خطای ۴۰۴
│   ├── _app.jsx              # تنظیمات کلی برنامه
│   │
│   └── 📁 dashboard/
│       ├── index.jsx          # صفحه دشبورد اصلی
│       └── 📁 patient-management/
│           └── index.jsx      # صفحه مدیریت بیماران
│
├── 📁 services/
│   ├── api.js                 # تنظیمات Axios و مدیریت توکن
│   ├── authService.js         # سرویس احراز هویت
│   └── patientService.js      # سرویس بیماران
│
├── 📁 store/
│   ├── index.js               # تنظیمات Redux Store
│   ├── authSlice.js           # State مدیریت احراز هویت
│   └── patientSlice.js        # State مدیریت بیماران
│
├── 📁 styles/
│   └── globals.css            # استایل‌های全局 و فونت Vazirmatn
│
├── 📁 public/
│   └── 📁 fonts/
│       ├── Vazirmatn-Regular.woff2
│       ├── Vazirmatn-Bold.woff2
│       └── Vazirmatn-Medium.woff2
│
├── next.config.mjs           # تنظیمات Next.js
├── package.json
├── tailwind.config.js        # تنظیمات Tailwind CSS
└── jsconfig.json             # مسیرهای پروژه
```

## 🚀 نصب و راه‌اندازی

# راهنمای راه‌اندازی سریع

## پیش‌نیازها

- Node.js 18+
- npm یا yarn

### مراحل نصب

1. **کلون کردن ریپازیتوری**

```bash
git clone <repository-url>
cd sama-prj
```

2. **نصب dependencies**

```bash
npm install
# یا
yarn install
```

3. **اجرای محیط توسعه**

```bash
npm run dev
# یا
yarn dev
```

4. **باز کردن در مرورگر**

```
http://localhost:3000
```

## 📜 اسکریپت‌ها

````json
{
  "dev": "next dev",           // اجرای حالت توسعه
  "build": "next build",       // ساخت پروژه برای production
  "start": "next start",       // اجرای نسخه production
  "predeploy": "npm run build", // آماده‌سازی برای deploy
  "deploy": "gh-pages -d out"  // deploy روی GitHub Pages
}
``
### Endpoints

#### 🔐 احراز هویت
```http
GET /Interview/Auth
````

- دریافت توکن JWT
- توکن در هدر Authorization ذخیره می‌شود

### ساختار داده بیمار

```typescript
interface Patient {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string; // ISO format
  isActive: boolean;
}
```

## 🧩 کامپوننت‌ها

### Layout Components

#### `Layout.js`

- Layout اصلی برنامه
- مدیریت Header و Sidebar
- ریسپانسیو برای موبایل و دسکتاپ

#### `Header.js`

- نوار بالایی با منوی کاربر
- دکمه تغییر تم تاریک/روشن
- منوی کاربر با قابلیت خروج

#### `Sidebar.js`

- منوی کناری با آیتم‌های ناوبری
- قابلیت جمع و باز شدن
- پشتیبانی از زیرمنو

### Patient Components

#### `PatientTable.jsx`

- نمایش جدول بیماران با pagination
- قابلیت جستجو و فیلتر
- اقدامات سریع (مشاهده، ویرایش، حذف)
- طراحی ریسپانسیو

#### `PatientForm.jsx`

- فرم ایجاد و ویرایش بیمار
- اعتبارسنجی بلادرنگ
- مدیریت خطاهای ورودی
- مودال زیبا و کاربرپسند

#### `PatientViewModal.jsx`

- نمایش کامل اطلاعات بیمار
- طراحی کارت اطلاعات
- قابلیت بستن آسان

### Utility Components

#### `RouteGuard.jsx`

- محافظت از مسیرهای حساس
- بررسی توکن و redirect خودکار
- مدیریت دسترسی‌ها

#### `ThemeContext.jsx`

- مدیریت تم تاریک/روشن
- ذخیره تنظیمات در localStorage
- یکپارچه‌سازی با Material-UI

## 🗄 State Management

### Redux Store Structure

```javascript
{
  auth: {
    token: string | null,
    isAuthenticated: boolean,
    loading: boolean,
    error: string | null
  },
  patients: {
    list: Patient[],
    selectedPatient: Patient | null,
    loading: boolean,
    error: string | null
  }
}
```

### Slices

#### `authSlice.js`

- مدیریت وضعیت احراز هویت
- actions: login, logout, clearError
- async actions: login (با API call)

#### `patientSlice.js`

- مدیریت داده‌های بیماران
- actions: CRUD operations, loading states
- async actions: getPatients, createPatient, updatePatient, deletePatient

## 🎨 استایل‌ها

### Tailwind CSS

- استایل‌دهی utility-first
- پشتیبانی از RTL
- کلاس‌های ریسپانسیو

### Material-UI Theme

- تم سفارشی‌شده برای پروژه
- پشتیبانی از حالت تاریک
- تنظیمات فونت Vazirmatn

### Global Styles

- تنظیمات RTL در سطح global
- تعریف فونت Vazirmatn
- استایل‌های پایه برای Material-UI

## 🌙 ویژگی‌های پیشرفته

### سیستم تم تاریک/روشن

- تغییر پویای تم
- ذخیره ترجیح کاربر
- یکپارچه با Material-UI

### مدیریت خطا

- نمایش خطاهای کاربرپسند
- مدیریت خطاهای شبکه
- بازیابی از خطاها

### بهینه‌سازی performance

- Lazy loading کامپوننت‌ها
- Memoization با React hooks
- بهینه‌سازی re-renders

### تجربه کاربری

- لودینگ‌های زیبا و معنادار
- پیام‌های تعاملی
- ناوبری روان

## 🚀 Deployment

### GitHub Pages

```bash
npm run predeploy
npm run deploy
```

## 👥 توسعه‌دهنده

- آرین عباسیان

### Best Practices پیاده‌سازی شده

#### ✅ Clean Code

- نام‌گذاری معنادار کامپوننت‌ها
- separation of concerns
- توابع pure و قابل تست

#### ✅ Git Conventions

- commit messages معنادار
- ساختار منطقی commitها
- documentation کامل

#### ✅ Performance

- بهینه‌سازی bundle size
- کد splitting
- image optimization

#### ✅ Accessibility

- semantic HTML
- keyboard navigation
- screen reader support

#### ✅ Security

- validation سمت کلاینت و سرور
- مدیریت امن توکن
- protection against XSS

git clone https://github.com/ArianAbbasian/Sama-Prj.git
cd Sama-Prj
npm install
npm run dev
