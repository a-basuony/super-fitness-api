# NestJS Quick Review — مراجعة سريعة (10-15 دقيقة)

> ملخص مكثف لـ [`NESTJS_LEARNING_BOOK.md`](./NESTJS_LEARNING_BOOK.md) — نفس الترقيم، بدون شرح مطوّل. مبني على مشروع Super Fitness API.

---

## Part 1 — Backend Foundations
Backend = يستقبل Requests عبر HTTP ويرد Responses. الطلب = Method + URL + Headers + Body + Query/Route params. الرد = Status Code + Body. Methods: `GET` اقرأ، `POST` أنشئ، `PATCH` عدّل جزئيًا (المشروع لا يستخدم `PUT` إطلاقًا)، `DELETE` احذف. Status codes: `2xx` نجاح، `4xx` خطأ عميل، `5xx` خطأ سيرفر. REST = كل شيء "مورد" له رابط ثابت، والفعل يحدده الـ Method. Authentication = "من أنت؟"، Authorization = "هل مسموح لك؟". كل عملية I/O (قاعدة بيانات/شبكة) يجب أن تكون `async/await` وإلا تُجمِّد السيرفر بالكامل.

**كلمة مفتاحية**: `AuthService.login()` يستخدم `await` مع كل استعلام قاعدة بيانات.

## Part 2 — TypeScript Foundations
- **Types**: فحص وقت الكتابة (compile-time)، يمنع أخطاء مثل تمرير `string` بدل `number`.
- **Interface**: يعرّف شكل كائن، يختفي تمامًا وقت التشغيل (فحص فقط).
- **Class**: قالب بيانات+سلوك؛ أساس Controllers/Services/Entities/DTOs في NestJS.
- **Access Modifiers**: `private readonly x: Type` في الـ constructor = اختصار لإنشاء وحقن property تلقائيًا (نمط DI الأساسي).
- **Generics**: `Repository<T>` — نفس الكود يعمل مع أي نوع بأمان.
- **Enums**: قيم ثابتة مسمّاة، مثل `UserType.ADMIN`.
- **Type Inference**: TypeScript يستنتج النوع تلقائيًا من القيمة.
- **Union (`|`) / Intersection (`&`)**: "أو" مقابل "و" بين نوعين.
- **Utility Types**: مثل `PartialType(CreateDto)` — يجعل كل الحقول اختيارية، مستخدَم في كل `Update...Dto` بالمشروع.
- **Decorators**: `@اسم(...)` تضيف سلوك/metadata فوق كلاس/دالة/حقل — هي "لغة" NestJS الحقيقية.
- **Dependency Typing**: النوع نفسه هو مفتاح البحث الذي يستخدمه NestJS لحقن الاعتماديات (بفضل `emitDecoratorMetadata`).

## Part 3 — Node.js Foundations
Node.js = بيئة تشغيل JS خارج المتصفح، تعمل بـ **Thread واحد** + Event Loop (non-blocking I/O) — لهذا كل استدعاء بطيء (DB/شبكة) يجب أن يكون async وإلا يُجمِّد كل الطلبات الأخرى. `package.json`: `dependencies` (وقت التشغيل) مقابل `devDependencies` (تطوير فقط). كل ملف `.ts` = module (import/export) — لا تخلط مع NestJS Module. Environment Variables تُقرأ من `.env` عبر `ConfigService`. أخطاء تُلتقط بـ `try/catch`، والخطأ الملتقط نوعه `unknown` (يحتاج `instanceof Error` قبل `.message`).

## Part 4 — Understanding NestJS
NestJS = إطار عمل فوق Express (أو Fastify)، يفرض بنية موحّدة (Modules/Controllers/Providers) + DI مدمج. `@Module()`: `imports` (موديولات أخرى)، `controllers`، `providers`، `exports` (ما يُتاح لموديولات أخرى). `main.ts` (`bootstrap()`) هو نقطة الإقلاع: يبني التطبيق، يفعّل `ValidationPipe` عالميًا، `AllExceptionsFilter`، `setGlobalPrefix('api')`، Swagger، ويبدأ `app.listen()`. `forRoot()` = إعداد ثابت لمرة واحدة، `forRootAsync({useFactory, inject})` = إعداد يحتاج DI/قيمًا غير متزامنة.

## Part 5 — NestJS Request Lifecycle
الترتيب النظري: `Middleware → Guards → Interceptors(قبل) → Pipes → Handler → Interceptors(بعد) → Response`، والأخطاء تذهب لـ Exception Filter من أي مرحلة. **في هذا المشروع فعليًا**: لا Middleware مطلقًا، لا Interceptor مفعَّل، فقط `ValidationPipe` عام + Guards (`AuthGuard` ثم `RolesGuard`) + Pipes على مستوى المسار. كل خطأ ينتهي في `AllExceptionsFilter`.

**كلمة مفتاحية**: Guards أولًا دائمًا — لا فائدة من فحص شكل البيانات لمستخدم غير مصرَّح له.

## Part 6 — Project Architecture
المشروع **Modular Monolith** (عملية واحدة، منظّمة كموديولات) + استثناء هجين واحد (RabbitMQ للبريد). تقسيم **Feature-based** (كل شيء يخص ميزة في مجلد واحد) — موصى به رسميًا لمشاريع متوسطة-كبيرة. التواصل بين الموديولات: إما `imports` مباشر (الأغلبية)، أو RabbitMQ (`emit`/`@EventPattern`) للبريد فقط. Business logic في `*.service.ts`، Database logic في `*.entity.ts` + `Repository<T>`، Shared logic في `src/common/`.

## Part 7 — Project Structure
`src/main.ts` (إقلاع) ← `src/app.module.ts` (الجذر) ← `src/common/` (Guards, Pipes, Decorators, Filters, Utils مشتركة) + `src/modules/` (كل الميزات). بنية موديول نموذجي: `*.module.ts` + `*.controller.ts` + `*.service.ts` + `entity/*.entity.ts` + `dto/create-*.dto.ts` + `dto/update-*.dto.ts` (عادة `PartialType`).

## Part 8 — Dependency Injection
**المشكلة**: بدون DI، كل كلاس يبني اعتمادياته بنفسه → ترابط قوي + استحالة اختبار. **الحل**: تطلب الاعتمادية في الـ constructor فقط، وNestJS (IoC Container) يبنيها ويمررها. Providers = كلاسات `@Injectable()` مسجَّلة في `providers`. الافتراضي **Singleton** (نسخة واحدة للتطبيق كله، وليس لكل طلب). Custom token: `@Inject('TOKEN')` عندما لا يوجد نوع كلاس واضح (مثل `useFactory`). هذا هو ما يجعل الاختبار ممكنًا: استبدال `Repository` الحقيقي بـ mock عبر `TestingModule`.

**كلمة مفتاحية**: `@InjectRepository(UserEntity)` + `getRepositoryToken()` في الاختبارات.

## Part 9 — Controllers
يستقبل HTTP فقط، يفوّض لـ Service — **لا يجب أن يحتوي أي قرار عمل**. Decorators: `@Get/@Post/@Patch/@Delete`. Parameter decorators: `@Body()`, `@Query()`, `@Param('x', Pipe)`, `@Req()`, `@UploadedFile()`. `@UseGuards()` على مستوى الكلاس يطبَّق على كل مسار بداخله، `@Roles()` على مستوى الدالة يضيف تفصيلاً. 3 أنماط في المشروع: بلا حماية (Health)، مصادقة فقط (AiChat)، مصادقة+دور (الأغلبية).

## Part 10 — DTOs & Validation
DTO = كلاس (وليس `interface`) لأن `class-validator` يحتاج الكلاس **موجودًا وقت التشغيل** ليفحص بيانات حقيقية قادمة من الشبكة. `ValidationPipe` العام (`main.ts`): `whitelist:true` (يحذف حقولاً غير معرَّفة)، `forbidNonWhitelisted:true` (يرفض الطلب بدل الحذف الصامت)، `transform:true` (يحوّل plain object لنسخة DTO فعلية + يحوّل الأنواع مثل نص→رقم عبر `@Type(() => Number)`). هذا يمنع **Mass Assignment**. نمط ثابت: `UpdateDto extends PartialType(CreateDto)`.

## Part 11 — Services & Business Logic
Service = أي `@Injectable()` يحمل القرارات/القواعد/التنسيق بين مصادر بيانات. Controller نحيف (سطر واحد) → Service يحتوي كل التحقق والقرارات (مثال: `changePassword` — تحقق قديمة، تحقق تكرار، هاش، حفظ). فائدة الفصل: اختبار بلا HTTP، إعادة استخدام، وضوح مكان المنطق. Service قد ينسّق بين أكثر من مصدر (DB + Cloudinary + AI) في نفس الدالة.

## Part 12 — Database
PostgreSQL علائقية: Table/Row/Column/Primary Key/Foreign Key/Index/Constraint/Transaction. علاقات: One-to-Many، One-to-One (لا Many-to-Many في المشروع). ORM = TypeORM، يمنع SQL Injection عبر parameterized queries. `@Entity()` = جدول، `@Column()`, `@ManyToOne(..., {onDelete:'CASCADE', eager})`. `Repository<T>`: `find/findOne/create(في الذاكرة فقط!)/save(كتابة فعلية)/update/delete/createQueryBuilder`. لا Migrations في المشروع — `synchronize:true` في التطوير فقط (خطير جدًا في الإنتاج). Transactions: `dataSource.transaction(...)` تضمن إما نجاح كل الخطوات أو تراجعها كلها (rollback).

**كلمة مفتاحية**: `create()` ≠ حفظ فعلي، فقط `save()` يكتب في القاعدة.

## Part 13 — Database Data Flow
تتبّع كامل: Request → ValidationPipe → Guards → Controller → Service → Repository → DB → عودة. `Object.assign(user, dto)` آمن **فقط** بفضل `whitelist:true` سابقًا. `relations:[...]` تبني JOIN واحد مركّب بدل استعلامات متعددة منفصلة.

## Part 14 — Authentication
كلمات المرور: **bcrypt** (بطيء عمدًا، 10 جولات) — `hash()` لا يُعكَس أبدًا، `compare()` يعيد حساب الهاش ويقارن. JWT = نص موقَّع رقميًا، بلا حالة على السيرفر (stateless). Payload المشروع: `{userId, userType}` فقط — لا أسرار. **توكنان**: Access (15 دقيقة، `JWT_ACCESS_SECRET`، لا يُخزَّن) و Refresh (7 أيام، `JWT_REFRESH_SECRET`، هاشه مخزَّن في `hashedRefreshToken` لإمكان الإبطال). `AuthGuard` يتحقق من JWT **ثم يعيد تحميل المستخدم من القاعدة** في كل طلب (لضمان الحالة الحالية، بتكلفة استعلام إضافي). رسالة خطأ موحّدة في `login` (`'Invalid email or password'`) لمنع **User Enumeration** — لكن `register()` غير متّسق (يكشف أن البريد مسجَّل). لا Cookies، فقط `Authorization: Bearer <token>`. لا OAuth، لا 2FA حقيقي.

## Part 15 — Authorization
دور واحد فقط لكل حساب: `UserType.ADMIN` / `USER`. `@Roles(...roles)` = `SetMetadata` تضع علامة فقط — **لا تفعل شيئًا بمفردها**، يقرؤها `RolesGuard`. لا نظام Policies منفصل؛ التفويض على مستوى البيانات (هل تملك هذا السجل؟) يعيش داخل الـ Service نفسه (شرط مزدوج في `findOne({where:{id, user:{id:userId}}})`).

## Part 16 — Guards
`CanActivate.canActivate(context)` يعيد `true`/`false`/يرمي استثناء. `ExecutionContext.switchToHttp().getRequest()` للوصول للطلب. 3 حراس: `AuthGuard` (Authentication)، `RolesGuard` (Authorization، يستخدم `Reflector.getAllAndOverride(ROLES_KEY, [handler, class])`)، `ThrottlerGuard` (من مكتبة، مربوط يدويًا في مكان واحد فقط). **الترتيب حرج**: `AuthGuard` يكتب `request.user`، `RolesGuard` يقرأه — عكس الترتيب = فشل صامت. **ثغرة حقيقية**: `AiChatController` يستخدم `@Roles()` بلا `RolesGuard` مربوط → معطَّلة فعليًا. `ThrottlerModule.forRoot()` وحدها لا تفعّل الحماية — تحتاج ربطًا صريحًا؛ في المشروع مربوطة على مسار AI-chat فقط، وليس على مسارات auth (ثغرة brute-force).

## Part 17 — Pipes
يحوّل/يتحقق من معامل واحد داخل، بعد Guards قبل الـ Handler. `ValidationPipe` (الأهم). مدمجة: `ParseIntPipe`, `ParseUUIDPipe`. Custom: `createImageValidation()` (factory تبني `ParseFilePipeBuilder` بنوع/حجم للصور، `required` قابل للتهيئة). **ثغرة**: رفع فيديو التمارين بلا أي Pipe تحقق (لا حد نوع/حجم).

## Part 18 — Interceptors
`intercept(context, next)` يغلّف التنفيذ (قبل **و**بعد) عبر `next.handle().pipe(map(...))` — الوحيد القادر على تعديل الاستجابة الخارجة. `TransformInterceptor` **مكتوب لكن غير مربوط أبدًا** في هذا المشروع (لا `useGlobalInterceptors`، لا `APP_INTERCEPTOR`) — دليل: سكربت قديم يقرأ 3 مستويات `.data` متوقعًا تغليفًا لم يعد موجودًا. **الدرس**: كتابة كود جيد لا تكفي — الربط (wiring) جزء أساسي، ونسيانه لا يظهر كخطأ compile-time.

## Part 19 — Middleware
يعمل **أول شيء**، قبل تحديد أي Route حتى، بلا `ExecutionContext`. **لا يوجد أي Middleware في هذا المشروع** — كل شيء مغطى عبر Pipes/Guards/Filters العامة. الفرق الحاسم عن Guard: Middleware لا يعرف أي Handler سيُستدعى؛ عن Interceptor: لا يستطيع تعديل الاستجابة الخارجة.

## Part 20 — Exception Handling
`HttpException` أساس كل الاستثناءات (`BadRequestException`400, `UnauthorizedException`401, `ForbiddenException`403, `NotFoundException`404, `ConflictException`409). `AllExceptionsFilter` (`@Catch()` بلا تحديد نوع = يلتقط كل شيء): يفرّق `HttpException` (يستخرج status/message الحقيقيَين) عن `Error` عادي (دائمًا 500). يجمع رسائل `class-validator` المتعددة بفاصلة. استجابة موحّدة دائمًا: `{success:false, message, data:null}`. أخطاء DB/خدمات خارجية تُترجَم محليًا داخل الـ Service (مثل Cloudinary/Gemini) قبل الوصول للـ Filter العام.

## Part 21 — Configuration
`ConfigModule.forRoot({isGlobal:true})` يقرأ `.env`، `isGlobal` يعني لا حاجة لاستيراده في كل موديول. `ConfigService.get<T>('KEY')`. الإعداد أحيانًا يقود سلوكًا بنيويًا كاملاً (مثل `synchronize` يعتمد على `NODE_ENV`). **نقص**: لا schema validation على متغيرات البيئة عند الإقلاع (Joi غير مستخدَم) — خطأ إعداد يُكتشَف متأخرًا جدًا (عند أول استخدام فعلي، وليس عند الإقلاع).

## Part 22 — External Services
- **Cloudinary**: تخزين صور/فيديو سحابي (بدل قرص السيرفر)، عبر SDK رسمي، الملف يُحوَّل base64 في الذاكرة قبل الرفع. الفشل عند الرفع → `BadRequestException`؛ فشل الحذف يُسجَّل فقط ويكمل (قد يترك ملفات يتيمة).
- **RabbitMQ**: وسيط رسائل، تفصيل كامل Part 24.
- **Google Gemini (عبر LangChain)**: نموذج LLM، `ChatPromptTemplate` + `MessagesPlaceholder('chat_history')` (آخر 10 رسائل) + `.stream()` يُجمَّع بالكامل قبل الإرسال للعميل (ليس بثًا حقيقيًا).

## Part 23 — File Uploads / Storage
`multipart/form-data` + Multer + `FileInterceptor('field')` + `@UploadedFile()`. لا تخزين على قرص السيرفر — الملف في الذاكرة، يُحوَّل base64، يُرفَع لـ Cloudinary، `secure_url` يُخزَّن في العمود مباشرة. **مقارنة أمنية**: Onboarding (صورة) محمي بنوع+حجم، Workout (فيديو) بلا أي تحقق — نفس النمط التقني بمستوى حماية مختلف = عدم اتساق، وليس جهلًا.

## Part 24 — Emails & Queues
لماذا طابور بدل SMTP مباشر: فصل زمن الإرسال البطيء عن استجابة HTTP. RabbitMQ: منتِج (`AuthService.emailClient.emit('email.send', payload)` — fire-and-forget، بلا `await`) ومستهلك (`MailProcessor` بـ `@EventPattern('email.send')` بدل `@Post`) في نفس العملية. `durable:true` = الطابور يبقى بعد إعادة تشغيل RabbitMQ. **خطر**: فشل النشر/الإرسال لا يظهر للعميل أبدًا — التسجيل ينجح بغض النظر.

## Part 25 — Testing
Unit فقط موجود فعليًا (كل Repository مُستبدَل بـ mock عبر `TestingModule` + `getRepositoryToken()`). لا Integration، لا E2E فعلي (سكربت `test:e2e` موجود لكن يفشل — لا مجلد `test/`). نمط AAA (Arrange/Act/Assert)، حتى `bcrypt` نفسها تُزيَّف بـ `jest.spyOn`. `auth.service.spec.ts`/`users.service.spec.ts` جيدة؛ `auth.guard.spec.ts` سطحي جدًا (`toBeDefined()` فقط)؛ `RolesGuard`, `TransformInterceptor`, `AllExceptionsFilter`, `CloudinaryService` بلا أي اختبار.

## Part 26 — Docker & Deployment
Image (قالب ثابت) مقابل Container (نسخة تعمل). `Dockerfile` **متعدد المراحل**: `base`(تثبيت) → `build`(`npm run build`) → `production` (ينسخ فقط `dist/`+`node_modules` — بلا devDependencies، حجم أصغر وأأمن). `docker-compose.dev.yml` (Postgres+RabbitMQ فقط) مقابل `docker-compose.production.yml` (الكل، مع `depends_on: {condition: service_healthy}`). `GET /api/health` هو العقد بين الكود وDocker healthcheck. **لا CI/CD** — كل شيء يدوي.

## Part 27 — Security
ملخص جدولي:
| المحور | الحالة |
|---|---|
| تسريب هاش كلمة المرور | 🔴 حرج — `@Exclude()` مكتوب لكن `ClassSerializerInterceptor` غير مربوط أبدًا، فالهاش يعود خامًا في `login`/`getProfile`/`GET /users` |
| Rate limiting على auth | 🟠 غير مفعَّل (فقط AI-chat محمي) |
| تحقق رفع فيديو التمارين | 🟠 غير موجود |
| اتساق منع Enumeration | 🟡 جزئي |
| CORS | 🟡 مفتوح بالكامل (`enableCors()` بلا خيارات) |
| SQL Injection | 🟢 لا ثغرات (parameterized queries) |
| كلمات المرور | 🟢 bcrypt + regex قوي |
| Mass Assignment | 🟢 محمي (`whitelist`+`forbidNonWhitelisted`) |
| Stack trace | 🟢 لا يُسرَّب أبدًا |

**الدرس الأهم**: Decorator تصريحي (`@Exclude`, `@Roles`) بلا طرف يقرأه وينفّذه (Interceptor/Guard مربوط) = بلا أثر وظيفي إطلاقًا.

## Part 28 — Complete Feature Flows
3 تدفقات كاملة مُشرَّحة: **Registration** (validate→check duplicate→hash→token→save→emit بريد مرتين→رد آمن يدوي البناء)، **Login ثم طلب محمي** (نفس التوكن يُتحقق منه لاحقًا عبر `AuthGuard`)، **AI Chat** (أعقد تدفق: Guards مختلفة الترتيب + Transaction + LangChain streaming + معالجة فشل محلية).

## Part 29 — Complete Request Tracing
أمثلة تتبّع جدولية: `DELETE /workouts/42` (حذف DB لا يتوقف لو فشل حذف Cloudinary)، `POST /category-group` (Service يستدعي Service آخر للتحقق من الأب)، `GET /workouts?...` (فلاتر تُضاف شرطيًا لـ `createQueryBuilder`، `getManyAndCount()`).

## Part 30 — Why Was This Used?
لكل تقنية: مشكلة تحلّها + بديل. NestJS (بدل Express خام) لبنية+DI جاهزين. TypeORM (بدل SQL خام/Prisma) لأمان+تكامل رسمي. JWT (بدل Sessions) لملاءمة الموبايل. bcrypt (بدل SHA/Argon2) لبطئه المتعمَّد. RabbitMQ لفصل البريد البطيء. class-validator/transformer (بدل تحقق يدوي/Zod/Joi). Guards منفصلة (بدل middleware ضخم) لمسؤولية واحدة واضحة. Cloudinary (بدل S3/محلي) لسهولة الإعداد. LangChain لتوحيد التعامل مع LLM. Docker متعدد المراحل لصورة إنتاج أصغر.

## Part 31 — Common Mistakes
DI: نسيان `@Injectable()`، الخلط بين توكن مخصَّص ونوع عادي، توقّع بناء جديد لكل طلب (الافتراضي Singleton). Guards/Decorators (**الأخطر**): الاعتقاد أن وجود decorator = أثر فعّال؛ ترتيب خاطئ في `@UseGuards()`. DTO: نسيان `transform:true`؛ `Object.assign` بلا whitelist؛ `UpdateDto` يرث من Entity مباشرة. DB: الخلط بين `create()`/`save()`؛ `synchronize:true` بالإنتاج؛ دمج SQL نصي مباشر. أخطاء: رمي `Error` عادي بدل `HttpException`؛ try/catch محلي زائد بدل الاعتماد على الـ Filter العام. أمان: إعادة Entity كامل كاستجابة؛ توقّع أن تسجيل Module عام يحمي تلقائيًا؛ تحقق ملفات غير متّسق. معمارية: حقن اعتماديات غير مستخدَمة؛ منطق عمل داخل Controller.

## Part 32 — From This Project to Any NestJS Project
ترتيب قراءة أي مشروع NestJS جديد: `main.ts` (Pipes/Filters/Interceptors عامة؟ hybrid؟) → `AppModule` (`imports` = خريطة الميزات) → كل Feature Module (imports/exports) → Controllers (مسارات+حراس) → Services (القرارات) → Repository/Entity (قاعدة البيانات) → Guards (مصادقة/تفويض) → Configuration (env vars) → خدمات خارجية. علامات تحذيرية: decorator بلا تحقق من الطرف الذي يقرأه، إعادة Entity خام كاستجابة، إعداد "عام" بلا ربط فعلي، عدم اتساق بين مسارات متشابهة، سكربتات تشير لملفات غير موجودة.

## Part 33 — How To Build This Project From Scratch
تسلسل قرارات البناء: Requirements → Architecture (Monolith أم Microservices؟) → Database Design (قبل الكود) → Modules (حسب الميزة) → APIs (REST) → Authentication (JWT لتطبيق موبايل) → Authorization (Guard يقرأ metadata، **تأكد من الربط دائمًا**) → Business Logic (كله في Services) → Testing (منذ البداية، خصوصًا Auth) → Docker (متعدد المراحل) → Deployment (healthchecks حقيقية + CI/CD إن أمكن).

## Part 34 — Knowledge Map
سلسلة اعتماد المفاهيم: HTTP → Node.js → TypeScript → NestJS Fundamentals → Modules/Architecture → DI → Controllers → DTOs → Services → Database → Authentication → Authorization/Guards → Pipes → Interceptors → Middleware → Exception Handling → Configuration → External Services → Testing → Docker → Security → Feature Flows → إتقان. لو ضِعت في مفهوم، ارجع للمفهوم الذي قبله مباشرة في هذه السلسلة.

## Part 35 — Final Cheat Sheet

| المصطلح | تعريف سطر واحد |
|---|---|
| Module | يجمع Controllers+Providers لميزة واحدة |
| Controller | يستقبل HTTP، يفوّض لـ Service |
| Provider | أي كلاس `@Injectable()` |
| Service | Provider يحمل منطق العمل |
| Guard | يقرر سماح/رفض قبل الـ Handler |
| Pipe | يحوّل/يتحقق من معامل واحد |
| Interceptor | يغلّف التنفيذ (قبل+بعد)، يعدّل الاستجابة |
| Middleware | أول شيء يعمل، قبل تحديد Route (غير مستخدَم هنا) |
| Filter | يوحّد شكل الأخطاء الخارجة |

**أهم 5 دروس من المشروع بأكمله**:
1. Decorator بلا طرف يقرأه ويفعّله = بلا أثر وظيفي (`@Roles` بلا `RolesGuard`، `@Exclude` بلا `ClassSerializerInterceptor`).
2. Controller نحيف دائمًا؛ كل قرار عمل في Service.
3. DTO + `whitelist`/`forbidNonWhitelisted` = خط الدفاع الأول ضد بيانات غير متوقَّعة.
4. الاتساق أهم من "الحل الأذكى" في مكان واحد فقط.
5. الأمان يعيش في التفاصيل الصغيرة (رسائل خطأ، ترتيب Guards، ربط Interceptor).

---

## أسئلة سريعة للمراجعة الذاتية

1. ما الفرق بين `PATCH` و`PUT`؟ ولماذا يستخدم هذا المشروع `PATCH` فقط؟
2. لماذا لا تكفي `interface` عادية للتحقق من بيانات قادمة من HTTP، وما الذي يجعل DTO يعمل وقت التشغيل؟
3. ما الفرق بين `Repository.create()` و`Repository.save()`؟
4. لماذا يُعيد `AuthGuard` تحميل المستخدم من قاعدة البيانات بدل الاكتفاء بمحتوى الـ JWT؟
5. لماذا يوجد Access Token وRefresh Token منفصلان بأسرار مختلفة؟
6. ما الذي يحدث فعليًا لو استخدمت `@Roles()` على مسار بلا `RolesGuard` مربوط في `@UseGuards()`؟
7. لماذا الترتيب `@UseGuards(AuthGuard, RolesGuard)` مهم، وماذا يحدث لو عُكس؟
8. ما الفرق الجوهري بين Guard وPipe وInterceptor من حيث "متى يعمل" و"ماذا يستطيع تعديله"؟
9. ما مصير `TransformInterceptor` في هذا المشروع، وما الدليل العملي على أنه كان يعمل يومًا ما؟
10. كيف يمنع `whitelist: true` + `forbidNonWhitelisted: true` هجوم Mass Assignment؟
11. ما الفرق بين `create()` (لا يلمس قاعدة البيانات) وأي استعلام `save()`/`update()` فعلي؟
12. لماذا `synchronize: true` مفيد في التطوير وخطير في الإنتاج؟
13. ما الثغرة الأمنية الأخطر الموثَّقة في هذا المشروع، وما السبب الجذري التقني لها؟
14. لماذا استخدام RabbitMQ (`emit` بدل استدعاء SMTP مباشرة) يحسّن تجربة تسجيل الحساب؟
15. عند فتح مشروع NestJS جديد تمامًا، ما أول 3 ملفات/أماكن يجب فتحها لبناء خريطة ذهنية سريعة؟
