# NESTJS BACKEND — COMPLETE LEARNING BOOK

> كتاب مذاكرة شخصي مبني بالكامل على مشروع **Super Fitness API** الحقيقي. الهدف ليس تعلّم "كيف يعمل هذا المشروع تحديدًا"، بل تعلّم **Backend/NestJS من الصفر**، باستخدام هذا المشروع كمنهج تطبيقي حي. كل مفهوم يُشرح أولاً بشكل عام، ثم يُربط بـ NestJS، ثم بتطبيقه الفعلي في هذا المشروع، مع اسم الملف والـ class والـ method كلما كان ذلك مهمًا.
>
> المرجع الثاني لهذا الكتاب هو [`docs/PROJECT_ANALYSIS.md`](./PROJECT_ANALYSIS.md) — خريطة المشروع الكاملة. هذا الكتاب هو "كيف أتعلّم وأفهم كل ما في تلك الخريطة، وأستطيع استخدامه في أي مشروع آخر."
>
> **قاعدة القراءة**: اقرأ بالترتيب من أول سطر. كل جزء يبني على ما قبله. لا تحتاج فتح أي ملف آخر أثناء القراءة الأولى — كل كود مطلوب مقتبس هنا مباشرة.

---

## Table of Contents

**الأساسيات**
- [Part 1 — Backend Foundations](#part-1--backend-foundations)
- [Part 2 — TypeScript Foundations](#part-2--typescript-foundations)
- [Part 3 — Node.js Foundations](#part-3--nodejs-foundations)

**NestJS من الصفر**
- [Part 4 — Understanding NestJS](#part-4--understanding-nestjs)
- [Part 5 — NestJS Request Lifecycle](#part-5--nestjs-request-lifecycle)
- [Part 6 — Project Architecture](#part-6--project-architecture)
- [Part 7 — Project Structure](#part-7--project-structure)

**اللبنات الأساسية**
- [Part 8 — Dependency Injection](#part-8--dependency-injection)
- [Part 9 — Controllers](#part-9--controllers)
- [Part 10 — DTOs & Validation](#part-10--dtos--validation)
- [Part 11 — Services & Business Logic](#part-11--services--business-logic)

**قاعدة البيانات**
- [Part 12 — Database](#part-12--database)
- [Part 13 — Database Data Flow](#part-13--database-data-flow)

**الأمان**
- [Part 14 — Authentication](#part-14--authentication)
- [Part 15 — Authorization](#part-15--authorization)
- [Part 16 — Guards](#part-16--guards)
- [Part 17 — Pipes](#part-17--pipes)
- [Part 18 — Interceptors](#part-18--interceptors)
- [Part 19 — Middleware](#part-19--middleware)
- [Part 20 — Exception Handling](#part-20--exception-handling)

**التشغيل والتكامل**
- [Part 21 — Configuration](#part-21--configuration)
- [Part 22 — External Services](#part-22--external-services)
- [Part 23 — File Uploads / Storage](#part-23--file-uploads--storage)
- [Part 24 — Emails & Queues](#part-24--emails--queues)
- [Part 25 — Testing](#part-25--testing)
- [Part 26 — Docker & Deployment](#part-26--docker--deployment)
- [Part 27 — Security](#part-27--security)

**التطبيق الشامل**
- [Part 28 — Complete Feature Flows](#part-28--complete-feature-flows)
- [Part 29 — Complete Request Tracing](#part-29--complete-request-tracing)
- [Part 30 — Why Was This Used?](#part-30--why-was-this-used)
- [Part 31 — Common Mistakes](#part-31--common-mistakes)

**ما بعد هذا المشروع**
- [Part 32 — From This Project to Any NestJS Project](#part-32--from-this-project-to-any-nestjs-project)
- [Part 33 — How To Build This Project From Scratch](#part-33--how-to-build-this-project-from-scratch)
- [Part 34 — Knowledge Map](#part-34--knowledge-map)
- [Part 35 — Final Cheat Sheet](#part-35--final-cheat-sheet)

---

# PART 1 — Backend Foundations

> هذا الجزء لمن ابتعد عن البرمجة لفترة طويلة. لن نفترض أنك تتذكر شيئًا. سنبني كل مفهوم من الصفر، ثم نربطه فورًا بمثال من مشروعنا.

### ما هو Backend؟

أي تطبيق تستخدمه (تطبيق لياقة على موبايلك مثلًا) مكوّن من جزأين:

- **Frontend (Client)**: ما يراه المستخدم ويتفاعل معه — الشاشات، الأزرار، النماذج.
- **Backend (Server)**: البرنامج الذي يعمل على جهاز بعيد (سيرفر)، ولا يراه المستخدم أبدًا. مسؤوليته: حفظ البيانات، تطبيق قواعد العمل (business rules)، التحقق من الهوية، والتواصل مع قاعدة البيانات.

مشروعنا **بالكامل** هو Backend — لا توجد فيه شاشة واحدة. كل ما فيه هو نقاط اتصال (endpoints) ينتظر منها تطبيق موبايل/ويب أن يرسل طلبات.

### Client vs Server

فكّر في الأمر كمطعم:

- **Client** = الزبون، يطلب طبقًا معينًا.
- **Server** = المطبخ، يستقبل الطلب، يجهّزه، ويعيده.
- **Request** = ورقة الطلب التي يعطيها النادل للمطبخ.
- **Response** = الطبق الجاهز الذي يعود للزبون.

في مشروعنا: تطبيق الموبايل هو الـ Client، و NestJS API الذي نُحلّله هو الـ Server.

### HTTP — لغة التواصل بينهما

**HTTP** (HyperText Transfer Protocol) هو البروتوكول (الاتفاقية) التي يتحدث بها الـ Client مع الـ Server. كل طلب من التطبيق للسيرفر، وكل رد من السيرفر للتطبيق، يمر عبر HTTP.

### Request — الطلب

كل طلب HTTP يحتوي دائمًا على:

| الجزء | ماذا يعني | مثال من مشروعنا |
|---|---|---|
| **Method** | نوع العملية المطلوبة | `POST` |
| **URL / Route** | العنوان المطلوب | `/api/auth/login` |
| **Headers** | معلومات وصفية عن الطلب | `Authorization: Bearer eyJhbGc...` |
| **Body** | البيانات المرسلة (عادة JSON) | `{"email":"a@a.com","password":"..."}` |
| **Query Parameters** | معاملات في نهاية الرابط | `?page=1&limit=10` |
| **Route Parameters** | جزء متغيّر من مسار الرابط نفسه | `/workouts/42` (الـ `42` هو الـ id) |

### Response — الرد

كل رد HTTP يحتوي على:

- **Status Code**: رقم يخبرك بنتيجة الطلب (نجاح/فشل ولماذا).
- **Headers**: معلومات عن الرد (نوع المحتوى مثلًا).
- **Body**: البيانات المُعادة (غالبًا JSON).

### HTTP Methods (الأفعال)

| Method | المعنى | الاستخدام النموذجي في مشروعنا |
|---|---|---|
| `GET` | اقرأ بيانات، لا تغيّر شيئًا | `GET /api/workouts` — جلب قائمة التمارين |
| `POST` | أنشئ شيئًا جديدًا | `POST /api/auth/register` — إنشاء حساب |
| `PATCH` | عدّل جزءًا من شيء موجود | `PATCH /api/users/profile` — تعديل بعض الحقول |
| `PUT` | استبدل شيئًا موجودًا بالكامل | *(غير مستخدَم في هذا المشروع — كل التعديلات `PATCH`)* |
| `DELETE` | احذف شيئًا | `DELETE /api/workouts/42` |

> **لاحظ**: مشروعنا يستخدم `PATCH` وليس `PUT` لكل التعديلات — لأن التعديلات هنا دائمًا جزئية (بعض الحقول فقط)، وهذا هو الفرق الجوهري: `PUT` يعني "استبدل الكائن بالكامل"، `PATCH` يعني "عدّل ما أرسلته فقط".

### Status Codes (رموز الحالة)

| المدى | المعنى | أمثلة من مشروعنا |
|---|---|---|
| `2xx` | نجاح | `200 OK` (نجاح عام)، `201 Created` (تسجيل ناجح) |
| `4xx` | خطأ من طرف الطلب (Client) | `400 Bad Request`، `401 Unauthorized` (توكن خاطئ)، `403 Forbidden` (لا تملك صلاحية)، `404 Not Found`، `409 Conflict` (البريد مستخدَم من قبل) |
| `5xx` | خطأ من طرف السيرفر | `500 Internal Server Error` |

هذه الرموز فعلية ومستخدَمة حرفيًا في مشروعنا — مثلًا `AuthService.login()` يرمي `UnauthorizedException` (401) عند خطأ في كلمة المرور، و`AuthService.register()` يرمي `ConflictException` (409) إذا كان البريد مستخدَمًا.

### Headers

بيانات وصفية تُرسَل مع كل طلب/رد. أهم Header في مشروعنا:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

هذا هو كيف يثبت العميل هويته في كل طلب محمي — سنراه بالتفصيل في [Part 14](#part-14--authentication).

### Body وJSON

**JSON** (JavaScript Object Notation) هو الصيغة القياسية لتبادل البيانات على الويب — نص منظَّم يشبه كائن JavaScript:

```json
{
  "email": "user@example.com",
  "password": "StrongPass123!"
}
```

جسم كل طلب `POST`/`PATCH` في مشروعنا هو JSON بهذا الشكل، والرد أيضًا JSON.

### Query Parameters مقابل Route Parameters

هذا فرق يخلط عليه كثير من المبتدئين:

- **Route Parameter**: جزء **من مسار** الرابط نفسه، يحدّد **مورد** بعينه.
  `GET /api/workouts/42` → `42` هو route parameter (id التمرين).
- **Query Parameter**: بعد علامة `?`، يُستخدم عادة **للفلترة/الترقيم**، وليس لتحديد مورد.
  `GET /api/workouts?page=1&limit=10&difficulty=beginner`

مشروعنا يستخدم كلاهما معًا في نفس المسار أحيانًا: `GET /api/workouts/segment/:segmentId?difficulty=beginner` — `segmentId` كـ route parameter و`difficulty` كـ query parameter.

### Cookies

ملفات صغيرة يخزّنها المتصفح ويرسلها تلقائيًا مع كل طلب لنفس الموقع — تُستخدم عادة لحفظ الجلسة (session). **مشروعنا لا يستخدم Cookies إطلاقًا** — الهوية تُثبَت فقط عبر Header `Authorization` يرسله العميل يدويًا مع كل طلب (سنشرح لماذا هذا الاختيار في [Part 14](#part-14--authentication)).

### REST API

**REST** هو أسلوب (نمط) لتصميم الـ API يعتمد على:

- كل "شيء" في النظام هو **مورد (Resource)** له رابط ثابت: `/workouts`, `/users`, `/foods`.
- الفعل المطلوب يُحدَّد بالـ HTTP Method وليس بالرابط: `GET /workouts` (اقرأ) بدل `/getWorkouts`.
- التمثيل عادة JSON.

مشروعنا يتبع هذا النمط بوضوح: `GET /api/foods`، `POST /api/foods`، `PATCH /api/foods/:foodId/ingredients/:ingredientId`، `DELETE /api/foods/:id` — كلها نفس المورد (`foods`)، وفعل مختلف عبر Method.

### Authentication مقابل Authorization

فرق جوهري سنعود له بعمق في [Part 14](#part-14--authentication) و[Part 15](#part-15--authorization)، لكن الفكرة الآن:

- **Authentication (المصادقة)** = "من أنت؟" — إثبات الهوية (تسجيل الدخول).
- **Authorization (التفويض)** = "هل يُسمح لك بهذا تحديدًا؟" — بعد معرفة هويتك، هل لديك الصلاحية؟

مثال من مشروعنا: `AuthGuard` يتحقق من هويتك (Authentication)، و`RolesGuard` يتحقق هل أنت `ADMIN` تحديدًا لتنفيذ هذا الفعل (Authorization).

### Synchronous مقابل Asynchronous

- **Synchronous (متزامن)**: كل سطر ينتظر انتهاء السابق قبل أن يبدأ.
- **Asynchronous (غير متزامن)**: عملية قد تستغرق وقتًا (مثل قراءة من قاعدة بيانات، أو طلب لخدمة خارجية) لا "تجمّد" باقي البرنامج أثناء الانتظار.

Backend حقيقي **يجب** أن يكون غير متزامن في كل عملية I/O (قاعدة بيانات، شبكة، ملفات) — وإلا فسيرفر واحد لن يستطيع خدمة أكثر من طلب واحد في نفس اللحظة.

### Promise

كائن JavaScript يمثّل "قيمة ستكون متاحة لاحقًا" — نتيجة عملية غير متزامنة. له 3 حالات: `pending` (قيد الانتظار)، `fulfilled` (نجحت)، `rejected` (فشلت).

```ts
function getUser(id: string): Promise<User> { ... }
```

هذا التوقيع يعني: "هذه الدالة لن تُعيد `User` فورًا، بل ستُعيد Promise سيتحول لاحقًا إلى `User`."

### async / await

طريقة كتابة كود غير متزامن **يبدو** كأنه متزامن (أسهل قراءة من `.then()` المتسلسلة):

```ts
async function login(email: string, password: string) {
  const user = await this.userRepository.findOne({ where: { email } }); // ينتظر هنا فقط، دون تجميد السيرفر بالكامل
  if (!user) throw new UnauthorizedException('Invalid email or password');
  // ... باقي الكود
}
```

هذا **حرفيًا** من `AuthService.login()` في مشروعنا (`src/modules/auth/auth.service.ts`). كل استدعاء لقاعدة البيانات في المشروع (`await this.userRepository...`) هو async — لأن الاستعلام يذهب عبر الشبكة إلى PostgreSQL وينتظر ردًا.

**ما يجب أن تتذكره**: أي دالة تحتوي `await` بداخلها يجب أن تكون معرَّفة بـ `async`، وأي دالة `async` تُعيد دائمًا `Promise` (حتى لو كتبت `return 5`, فعليًا تُعيد `Promise<number>`).

---

# PART 2 — TypeScript Foundations

> NestJS مبني بالكامل على TypeScript، وليس اختياريًا. لن نشرح كل TypeScript — فقط ما يحتاجه فهم هذا المشروع.

## Concept: Types

**1. ما هو؟** JavaScript لغة "بلا أنواع" (untyped) — أي متغيّر يمكن أن يحمل أي قيمة. TypeScript يضيف طبقة فوق JavaScript تسمح لك بتحديد **نوع** كل قيمة (نص، رقم، كائن معيّن...) والتحقق من ذلك **وقت الكتابة**، قبل التشغيل.

**2. لماذا نحتاجه؟** بلا أنواع، خطأ مثل تمرير `string` لدالة تتوقع `number` لا تكتشفه إلا وقت التشغيل (قد يكون في بيئة الإنتاج). مع الأنواع، محرر الكود (وTypeScript compiler) يكتشفه فورًا أثناء الكتابة.

**3. مثال بسيط:**
```ts
let age: number = 25;
age = "twenty five"; // خطأ Compile-time: Type 'string' is not assignable to type 'number'
```

**4. كيف يستخدم في المشروع؟** كل متغيّر، معامل دالة، وقيمة راجعة في المشروع لها نوع — إما صريح أو مُستنتَج (type inference، انظر أدناه).

**5. أين في الكود؟** كل مكان تقريبًا. مثال من `src/common/utils/otp.util.ts`:
```ts
export function generateOtp(length: number = 6): string {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return crypto.randomInt(min, max).toString();
}
```
`length: number` = نوع المعامل، `: string` بعد الأقواس = نوع القيمة الراجعة. لو حاولت استدعاءها بـ `generateOtp("6")` سيرفض TypeScript الكود قبل التشغيل.

**6. ما الذي يجب أن أتذكره؟** النوع هو "عقد" (contract) — يخبر كل من يستخدم الدالة بالضبط بما يُدخِله وما سيحصل عليه.

## Concept: Interfaces

**1. ما هو؟** تعريف لشكل كائن (object) — ما الحقول التي يجب أن يملكها، ونوع كل حقل — بلا أي تنفيذ (implementation) فعلي.

**2. لماذا نحتاجه؟** لضمان أن كائنات مختلفة (قادمة من أماكن مختلفة في الكود) تلتزم بنفس "الشكل" المتوقَّع.

**3. مثال بسيط:**
```ts
interface Point {
  x: number;
  y: number;
}
const p: Point = { x: 1, y: 2 }; // صحيح
const bad: Point = { x: 1 };     // خطأ: y مفقود
```

**4-5. كيف يستخدم في المشروع؟ أين؟** في `src/common/interface/userreq.interface.ts`:
```ts
import { UserEntity } from 'src/modules/users/entity/user.entity';

export interface UserReq extends Request {
  user: UserEntity;
}
```
`Request` هو نوع من Express (الطلب الأساسي). هذه الواجهة تقول: "أي `UserReq` هو `Request` عادي + حقل إضافي `user` من نوع `UserEntity`." تُستخدم في كل Controller محمي، مثل `AuthController.logout(@Req() req: UserReq)` — بهذا، الكود يعرف أن `req.user.id` موجود ومن النوع الصحيح، دون الحاجة لأي تحقق يدوي.

**6. ما الذي يجب أن أتذكره؟** الـ Interface لا "تفعل" شيئًا وقت التشغيل — تختفي بالكامل بعد الترجمة إلى JavaScript. هي أداة **فحص فقط**، تعمل وقت الكتابة.

## Concept: Classes

**1. ما هو؟** قالب لإنشاء كائنات (objects) تحمل بيانات (properties) وسلوكًا (methods) معًا. أساس كل شيء تقريبًا في NestJS.

**2. لماذا نحتاجه؟** NestJS يعتمد بالكامل على الـ Classes لتعريف كل شيء: Controllers، Services، Entities، DTOs، Guards. هذا لأن الـ Class هو ما يسمح بـ **Decorators** (سنشرحها بعد قليل) و**Dependency Injection**.

**3. مثال بسيط:**
```ts
class Animal {
  constructor(public name: string) {}
  speak(): string { return `${this.name} makes a sound.`; }
}
```

**4-5. كيف يستخدم؟ أين؟** كل شيء تقريبًا في `src/`. مثال من `src/modules/users/users.service.ts`:
```ts
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findById(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
```
`UsersService` كلاس، له `constructor` (منشئ) و`methods` (مثل `findById`).

**6. ما الذي يجب أن أتذكره؟** في NestJS، كل Class معرَّف بـ `@Injectable()` أو `@Controller()` إلخ. يصبح جزءًا من نظام Dependency Injection — سنشرح هذا بعمق في [Part 8](#part-8--dependency-injection).

## Concept: Access Modifiers

**1. ما هو؟** كلمات (`public`, `private`, `protected`, `readonly`) تحدّد من يستطيع الوصول لحقل/دالة معيّنة داخل الكلاس.

**2. لماذا نحتاجه؟** لحماية التفاصيل الداخلية للكلاس من أي استخدام خارجي غير مقصود.

| المعدِّل | المعنى |
|---|---|
| `public` (افتراضي) | يمكن الوصول إليه من أي مكان |
| `private` | فقط من داخل نفس الكلاس |
| `protected` | من داخل الكلاس والكلاسات التي ترثه |
| `readonly` | يُقرأ فقط بعد التهيئة الأولى، لا يمكن تعديله لاحقًا |

**4-5. كيف يستخدم؟ أين؟** أكثر نمط تراه في المشروع هو **حقن الاعتماديات عبر الـ constructor**، من `src/modules/auth/auth.service.ts`:
```ts
constructor(
  @InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>,
  private readonly jwtService: JwtService,
  private readonly configService: ConfigService,
) {}
```
هذه صياغة مختصرة جدًا في TypeScript: كتابة `private readonly` قبل معامل الـ constructor تُنشئ تلقائيًا حقلاً (property) في الكلاس بنفس الاسم، وتُسنِد له القيمة الممرَّرة — **بلا الحاجة لكتابة `this.userRepository = userRepository` يدويًا**. `private` تعني: `userRepository` غير متاح خارج `AuthService`. `readonly` تعني: لا يمكن استبداله بعد أن يُحقَن مرة واحدة.

**6. ما الذي يجب أن أتذكره؟** كل constructor في المشروع تقريبًا مليء بـ `private readonly X` — هذا هو نمط "حقن الاعتمادية" الأساسي في NestJS، وسنراه مئات المرات.

## Concept: Generics

**1. ما هو؟** طريقة لكتابة كلاس/دالة/نوع يعمل مع **أي نوع بيانات**، دون التخلي عن فحص الأنواع. بدل `Repository<any>` (يفقد كل الفائدة)، نكتب `Repository<T>` حيث `T` يُحدَّد عند الاستخدام.

**2. لماذا نحتاجه؟** لكتابة كود عام قابل لإعادة الاستخدام (مثل مكتبة TypeORM كاملة) بينما يبقى كل استخدام له آمن النوع (type-safe).

**3. مثال بسيط:**
```ts
function firstItem<T>(arr: T[]): T { return arr[0]; }
const n = firstItem([1, 2, 3]);       // n: number
const s = firstItem(["a", "b"]);      // s: string
```

**4-5. كيف يستخدم؟ أين؟** هذا هو بالضبط ما يجعل `Repository<UserEntity>` يعمل — من `src/modules/users/users.service.ts`:
```ts
@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
```
`Repository<T>` هي كلاس عام (Generic) من TypeORM. عندما نكتب `Repository<UserEntity>`، كل دالة بداخله (`find`, `save`, `findOne`...) تصبح تلقائيًا تعرف أنها تتعامل مع `UserEntity` تحديدًا — `userRepository.find()` يُعيد `Promise<UserEntity[]>` وليس `Promise<any[]>`.

**6. ما الذي يجب أن أتذكره؟** كل مرة ترى `<...>` بعد اسم نوع (Repository, Promise, Array) — هذا Generic. اقرأه كـ "هذا يعمل مع النوع المكتوب بداخل `<>`".

## Concept: Enums

**1. ما هو؟** مجموعة ثابتة ومسمّاة من القيم الممكنة لحقل معيّن.

**2. لماذا نحتاجه؟** بدل كتابة `"admin"` كنص حر (عرضة للأخطاء الإملائية) في عشرات الأماكن، نكتب `UserType.ADMIN` — يتحقق TypeScript أنك لم تكتبها خطأً، ويقترحها محرر الكود تلقائيًا.

**3-4-5. مثال ومكان الاستخدام في المشروع:** من `src/common/utils/enums.ts`:
```ts
export enum UserType {
  ADMIN = 'admin',
  USER = 'user',
}
```
يُستخدم في `UserEntity.type` (عمود قاعدة البيانات نفسه من نوع enum)، وفي كل مكان يتحقق من الصلاحية: `@Roles(UserType.ADMIN)` في `WorkoutController`.

**6. ما الذي يجب أن أتذكره؟** الـ enum له وجهان: **المفتاح** (`ADMIN`) الذي تستخدمه في الكود، و**القيمة** (`'admin'`) المخزَّنة فعليًا في قاعدة البيانات/JSON. مثال على خطأ حقيقي موجود في المشروع نفسه (`enums.ts`):
```ts
export enum GoalType {
  // ...
  LEARB_THE_BASICS = 'learn_the_basics', // ← خطأ إملائي في المفتاح (LEARB بدل LEARN)
}
```
القيمة النصية صحيحة، لكن المفتاح به خطأ إملائي — درس عملي: أخطاء الكتابة تحدث حتى في المفاتيح البرمجية، ولا يكتشفها Compiler لأنها مجرد اسم.

## Concept: Type Inference

**1. ما هو؟** قدرة TypeScript على **استنتاج** نوع المتغيّر تلقائيًا من القيمة المُسنَدة إليه، دون أن تكتب النوع صراحة.

**2. لماذا نحتاجه؟** لتقليل الكتابة الزائدة (boilerplate) دون فقدان أمان الأنواع.

**3. مثال:**
```ts
let age = 25; // TypeScript يستنتج: age: number، تلقائيًا
```

**4-5. في المشروع:** أغلب المتغيّرات المحلية داخل الدوال لا تحمل نوعًا صريحًا — TypeScript يستنتجه. مثال من `AuthService.login()`:
```ts
const user = await this.userRepository.findOne({ where: { email } });
```
لم نكتب `: UserEntity | null` بعد `user` — TypeScript استنتجه تلقائيًا من نوع القيمة التي تُعيدها `findOne`.

**6. ما الذي يجب أن أتذكره؟** لا تكتب النوع صراحة إن كان واضحًا من القيمة — هذا يُبقي الكود نظيفًا. اكتبه صراحة فقط في تواقيع الدوال العامة (parameters, return type) حيث لا توجد قيمة ليستنتج منها.

## Concept: Union Types

**1. ما هو؟** نوع يمكن أن يكون **واحدًا من عدة أنواع محدَّدة**، باستخدام `|`.

**2. لماذا نحتاجه؟** بعض القيم فعليًا تحتمل أكثر من شكل — مثل حقل قد يكون موجودًا أو `null`.

**3. مثال:**
```ts
let id: string | number;
id = "abc"; // صحيح
id = 123;   // صحيح أيضًا
```

**4-5. في المشروع:** من `src/modules/onboarding/onboarding.entity.ts`-جانب usedAt في `email-change.entity.ts`:
```ts
@Column({ type: 'timestamp', nullable: true })
usedAt: Date | null;
```
`Date | null` يعني: هذا الحقل إما تاريخ فعلي، أو `null` (لم يُستخدم بعد). هذا يجبر أي كود يقرأ `usedAt` على التعامل مع احتمال أن تكون القيمة `null` — وإلا Compiler سيحذّر.

**6. ما الذي يجب أن أتذكره؟** رؤية `X | null` تعني: "تحقق قبل الاستخدام أن القيمة ليست null". *(ملاحظة: مشروعنا يعطّل `strictNullChecks` في `tsconfig.json` — مما يعني أن هذا التحقق غير مفروض فعليًا من الـ Compiler حاليًا، وهي نقطة ضعف نوقشها في [Part 31](#part-31--common-mistakes)).*

## Concept: Intersection Types

**1. ما هو؟** دمج نوعين أو أكثر في نوع واحد يحمل **كل** خصائصهما، باستخدام `&`.

**2-3. لماذا؟ مثال:**
```ts
type WithId = { id: string };
type WithName = { name: string };
type Both = WithId & WithName; // { id: string; name: string }
```

**4-5. في المشروع:** يظهر في `AuthGuard`:
```ts
const request = context
  .switchToHttp()
  .getRequest<{ headers: Record<string, string | string[]>; user?: unknown }>();
```
هذا ليس Intersection مباشرة، لكنه يوضّح نمطًا مشابهًا — تعريف نوع مضمَّن (inline) للـ request المتوقَّع بدل استخدام النوع الكامل من Express.

**6. ما الذي يجب أن أتذكره؟** `|` تعني "أو" (واحد من)، `&` تعني "و" (كلاهما معًا).

## Concept: Utility Types

**1. ما هو؟** أنواع جاهزة يوفرها TypeScript (أو مكتبات فوقه) لتحويل نوع موجود إلى نوع جديد دون إعادة كتابته.

**2. لماذا نحتاجه؟** أكثر مثال حي في مشروعنا: `PartialType` من `@nestjs/swagger` — يحوّل كل الحقول في DTO إلى **اختيارية**.

**3-4-5. مثال حقيقي:** من `src/modules/workout/dto/update-workout.dto.ts`:
```ts
import { PartialType } from '@nestjs/swagger';
import { CreateWorkoutDto } from './create-workout.dto';

export class UpdateWorkoutDto extends PartialType(CreateWorkoutDto) {}
```
`CreateWorkoutDto` يفرض حقولاً مثل `title` و`segmentId` كإلزامية (`@IsNotEmpty()`). عند التعديل (`PATCH`)، لا نريد إجبار العميل على إرسال كل الحقول من جديد — فقط ما يريد تغييره. `PartialType(CreateWorkoutDto)` يُنشئ كلاسًا جديدًا **بنفس حقول** `CreateWorkoutDto`، لكن **كل حقل أصبح اختياريًا تلقائيًا** (ويحافظ على كل قواعد `class-validator` المرتبطة بها إن أُرسلت).

**6. ما الذي يجب أن أتذكره؟** هذا النمط (`Create...Dto` ثم `Update...Dto extends PartialType(Create...Dto)`) متكرر في **كل** موديول تقريبًا في المشروع (Onboarding, Workout, CategorySegment, Ingredient) — تعلّمه مرة واحدة يكفي لفهمه في كل مكان.

## Concept: Decorators

**1. ما هو؟** دالة خاصة تُكتب فوق كلاس/دالة/حقل/معامل بصيغة `@اسم(...)`، وتُضيف **سلوكًا أو معلومات وصفية (metadata)** له دون تعديل كوده مباشرة.

**2. لماذا نحتاجه؟** NestJS **بالكامل** مبني على الـ Decorators — هي الطريقة التي يُخبر بها الكود إطار العمل "هذا كلاس Controller"، "هذه الدالة تستجيب لـ GET"، "هذا الحقل يجب أن يكون بريدًا إلكترونيًا صحيحًا"، إلخ.

**3. مثال مبسّط لفكرة كيف يعمل Decorator (مفهوميًا):**
```ts
function LogCall() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      console.log(`Calling ${key}`);
      return original.apply(this, args);
    };
  };
}
class Example {
  @LogCall()
  doSomething() { /* ... */ }
}
```

**4-5. في المشروع (أمثلة من كل نوع Decorator):**

| النوع | مثال من المشروع | الملف |
|---|---|---|
| Class decorator | `@Controller('auth')` | `auth.controller.ts` |
| Class decorator | `@Injectable()` | `auth.service.ts` |
| Method decorator | `@Post('login')` | `auth.controller.ts` |
| Property decorator | `@Column({ unique: true })` | `user.entity.ts` |
| Parameter decorator | `@Body() loginDto: LoginDto` | `auth.controller.ts` |
| Property decorator | `@IsEmail()` | `login.dto.ts` |
| Custom decorator | `@Roles(UserType.ADMIN)` | معرَّف في `src/common/decorators/roles.decorator.ts` |

مثال حقيقي مجمَّع، من `auth.controller.ts`:
```ts
@Post('login')                          // ← Method decorator: هذه الدالة تستجيب لـ POST /login
@HttpCode(HttpStatus.OK)                 // ← Method decorator: أعد 200 بدل الافتراضي 201
login(@Body() loginDto: LoginDto) {      // ← Parameter decorator: خذ جسم الطلب واملأ به LoginDto
  return this.authService.login(loginDto);
}
```

**6. ما الذي يجب أن أتذكره؟** اقرأ أي Decorator كجملة: `@Post('login')` = "هذه الدالة تعالج طلبات POST على `/login`". `@Body()` = "خذ جسم الطلب من هنا". الـ Decorators هي "لغة" NestJS الحقيقية — تعلّمها = تعلّم NestJS.

## Concept: Dependency Typing (كتابة أنواع الاعتماديات)

**1. ما هو؟** عندما تحقن اعتمادية (Service, Repository...) داخل constructor، النوع الذي تكتبه هو ما يُخبر NestJS **بالضبط** أي Provider يجب حقنه (سنشرح آلية هذا بعمق في [Part 8](#part-8--dependency-injection)).

**2. لماذا نحتاجه؟** بلا نوع دقيق، NestJS (ونحن) لا نعرف أي كائن يجب توفيره هنا.

**3-4-5. مثال حقيقي:**
```ts
constructor(
  private readonly jwtService: JwtService,        // النوع = التوكن الذي يبحث عنه NestJS
  private readonly userService: UsersService,
  private readonly configService: ConfigService,
) {}
```
هذا من `src/common/services/guards/auth/auth.guard.ts`. كل نوع هنا (`JwtService`, `UsersService`, `ConfigService`) هو أيضًا **مفتاح البحث** الذي يستخدمه NestJS داخليًا لإيجاد الكائن الصحيح وتمريره.

**6. ما الذي يجب أن أتذكره؟** في TypeScript العادي، الأنواع تختفي وقت التشغيل (compile-time only). لكن NestJS يستخدم ميزة تسمى `emitDecoratorMetadata` (مفعّلة في `tsconfig.json` لهذا المشروع) لتُبقي معلومة "هذا النوع" متاحة وقت التشغيل أيضًا — وهذا **بالضبط** ما يجعل Dependency Injection ممكنًا في NestJS. بدونها، DI لن يعمل.

---

# PART 3 — Node.js Foundations

> Node.js هو البيئة التي يعمل بداخلها كل كود JavaScript/TypeScript في هذا المشروع خارج المتصفح. NestJS مبني فوقه بالكامل.

### ما هو Node.js؟

بيئة تشغيل (runtime) تسمح بتشغيل JavaScript **خارج** المتصفح — على سيرفر، كأي لغة backend أخرى (Python, Java, Go...). هذا هو ما يُشغِّل `dist/main.js` في مشروعنا فعليًا (`CMD ["node", "dist/main"]` في `Dockerfile`).

### npm و package.json

**npm** (Node Package Manager) هو أداة تثبيت وإدارة المكتبات الخارجية. **`package.json`** هو الملف الذي يسرد:

- اسم المشروع وإصداره.
- **`dependencies`**: مكتبات يحتاجها التطبيق **وقت التشغيل** (مثل `@nestjs/core`, `bcrypt`, `typeorm`).
- **`devDependencies`**: أدوات يحتاجها **وقت التطوير فقط** (مثل `jest`, `eslint`, `typescript`) — لا تُرفَع للإنتاج.
- **`scripts`**: أوامر مختصرة (`npm run start:dev` بدل أمر طويل).

من `package.json` مشروعنا:
```json
"scripts": {
  "start:dev": "nest start --watch",
  "build": "nest build",
  "test": "jest"
}
```

### Modules و imports/exports

كل ملف `.ts` في المشروع هو **module** منفصل — يُصدِّر (export) ما يريد إتاحته لملفات أخرى، ويستورد (import) ما يحتاجه منها.

```ts
// otp.util.ts
export function generateOtp(length: number = 6): string { /* ... */ }

// auth.service.ts
import { generateOtp } from 'src/common/utils/otp.util';
```

> **تنبيه تسمية مهم**: كلمة "Module" في Node.js (ملف واحد) شيء مختلف تمامًا عن "Module" في NestJS (`@Module()` — تجميعة من Controllers/Providers، سنشرحها في [Part 4](#part-4--understanding-nestjs)). سنستخدم "NestJS Module" صراحة عند الحاجة للتفريق.

### Environment Variables (متغيرات البيئة)

قيم إعداد (أسرار، عناوين، مفاتيح) لا يجب أن تكون مكتوبة داخل الكود مباشرة — بل تُقرأ من بيئة التشغيل. في مشروعنا موجودة في ملف `.env` (محليًا) وتُقرأ عبر `process.env.X` (غالبًا بشكل غير مباشر عبر `ConfigService` من NestJS — سنراه في [Part 21](#part-21--configuration)).

مثال من `.env.example`:
```
JWT_ACCESS_SECRET=your_secure_jwt_access_secret_minimum_32_characters
DATABASE_HOST=127.0.0.1
```

**لماذا هذا مهم؟** لأن نفس الكود يعمل في التطوير والإنتاج بإعدادات مختلفة تمامًا (قاعدة بيانات مختلفة، أسرار مختلفة) دون تعديل سطر واحد من الكود — فقط بتغيير `.env`.

### Async Operations في Node.js (Event Loop، بالقدر المطلوب فقط)

Node.js يعمل على **thread واحد فقط** (على عكس لغات أخرى تفتح thread لكل طلب). كيف يخدم آلاف الطلبات في نفس الوقت إذن؟ عبر **Event Loop**:

- عندما يطلب الكود عملية بطيئة (قراءة من قاعدة بيانات، طلب شبكة)، Node **لا ينتظر** — يسجّل "عند انتهاء هذه العملية، نفّذ هذا الكود" ثم ينتقل فورًا لخدمة طلب آخر.
- عند انتهاء العملية البطيئة فعليًا (في الخلفية، عبر النظام)، يعود Event Loop وينفّذ الكود المسجَّل.

هذا هو بالضبط سبب أهمية `async/await` من [Part 1](#part-1--backend-foundations) — كل `await this.userRepository.findOne(...)` هو "نقطة تسليم" تسمح لـ Node بخدمة طلبات أخرى أثناء انتظار الرد من PostgreSQL.

**ما يجب أن تتذكره فقط**: Node.js = thread واحد + عدم حجب (non-blocking I/O). لهذا **يجب** أن يكون كل استدعاء لقاعدة بيانات أو خدمة خارجية في مشروعنا `async` — استدعاء متزامن (synchronous) طويل سيُجمّد **كل** الطلبات الأخرى على نفس السيرفر، ليس فقط طلبك أنت.

### معالجة الأخطاء في Node.js

نمط `try/catch` القياسي حول أي كود قد يفشل. مثال من `mail.processor.ts`:
```ts
try {
  await this.mailService.sendMail(data);
  this.logger.log(`Email sent to ${data.to}`);
} catch (error: unknown) {
  const message = error instanceof Error ? error.message : JSON.stringify(error);
  this.logger.error(`Failed to send email to ${data.to}: ${message}`);
  throw error;
}
```
لاحظ `error: unknown` — في TypeScript الحديث، الخطأ الملتقَط في `catch` نوعه `unknown` (وليس `any` أو `Error` تلقائيًا)، لذلك يجب التحقق (`error instanceof Error`) قبل الوصول لـ `.message`. سنعمّق هذا في [Part 20](#part-20--exception-handling) على مستوى NestJS بالكامل (Exception Filters).

---

# PART 4 — Understanding NestJS

### What is NestJS?

**NestJS** هو إطار عمل (framework) لبناء تطبيقات Backend بـ TypeScript/Node.js. الفكرة الجوهرية: بدل أن يكتب كل مطوّر تنظيمًا مختلفًا لمشروعه (كما يحدث مع Express الخام)، يفرض NestJS **بنية موحّدة** (Modules, Controllers, Providers) وآلية **Dependency Injection** مدمجة، مستوحاة كثيرًا من Angular (لهذا Decorators في كل مكان).

من الناحية التقنية: NestJS يعمل **فوق** Express (أو Fastify اختياريًا) — لا يعيد اختراع HTTP، بل يبني طبقة تنظيم فوقه. مشروعنا يستخدم `@nestjs/platform-express` تحديدًا (مذكور في `package.json`)، أي أن Express يعمل تحت الغطاء.

### Why NestJS؟ (لماذا لا Express مباشرة؟)

Express وحده يعطيك حرية كاملة لكن **بلا بنية**: كل فريق ينظّم مشروعه بطريقته، ولا آلية DI مدمجة (تحتاج مكتبة خارجية أو حلول يدوية)، ولا تكامل جاهز مع TypeScript. NestJS يحل هذا عبر:

- بنية موحّدة (Modules/Controllers/Providers) تجعل أي مطوّر NestJS آخر يفهم مشروعك بسرعة.
- Dependency Injection مدمج بالكامل ([Part 8](#part-8--dependency-injection)).
- تكامل جاهز مع TypeScript، Validation، Swagger، ORMs، Microservices، إلخ — كل ما يحتاجه مشروعنا (`@nestjs/typeorm`, `@nestjs/swagger`, `@nestjs/microservices`, `@nestjs/throttler`) هو حزمة NestJS رسمية مبنية بنفس الفلسفة.

### NestJS Architecture — الصورة الكبيرة

كل تطبيق NestJS مبني من 3 لبنات أساسية تتكرر آلاف المرات بأشكال مختلفة:

```mermaid
flowchart LR
  M["Module<br/>(يُجمّع)"] --> C["Controller<br/>(يستقبل HTTP)"]
  M --> P["Provider / Service<br/>(يحتوي المنطق)"]
  C -- "يستدعي عبر DI" --> P
```

- **Module**: صندوق تنظيمي يجمع مجموعة Controllers وProviders مرتبطة بميزة واحدة (مثل كل شيء يخص "auth").
- **Controller**: يستقبل طلبات HTTP، يقرر أي دالة يجب أن تعالجها، ثم يفوّض العمل الفعلي لـ Service.
- **Provider (وأشهر أنواعه Service)**: يحتوي المنطق الفعلي — قراءة/كتابة قاعدة بيانات، قواعد العمل، إلخ.

### Modules بالتفصيل

كل جزء ميزة في NestJS يُغلَّف داخل `@Module()`. مثال حقيقي كامل من `src/modules/users/users.module.ts`:

```ts
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ChatSession, ChatMessage])],
  controllers: [UsersController],
  providers: [UsersService, JwtService],
  exports: [UsersService, JwtService],
})
export class UsersModule {}
```

| الخاصية | المعنى |
|---|---|
| `imports` | موديولات أخرى نحتاج ما تُصدِّره (هنا: تسجيل الكيانات لـ TypeORM) |
| `controllers` | Controllers التي يملكها هذا الموديول |
| `providers` | Services (وغيرها) المتاحة للحقن **داخل** هذا الموديول |
| `exports` | أي providers من القائمة أعلاه تريد إتاحتها لموديولات **أخرى** تستورد هذا الموديول |

`exports: [UsersService, JwtService]` هو بالضبط سبب قدرة `AuthModule` على استخدام `UsersService` — لأنه يستورد `UsersModule` (`imports: [..., UsersModule]` في `auth.module.ts`)، وبالتالي يحصل على كل ما صدّره.

### Controllers بإيجاز (تفصيل كامل في Part 9)

```ts
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  async getProfile(@Request() req: UserReq) {
    return await this.usersService.getProfile(req.user.id);
  }
}
```
`@Controller('users')` يعني: كل مسار داخل هذا الكلاس يبدأ بـ `/users` (زائدًا `/api` العام — سنشرحه في Part 6).

### Providers / Services بإيجاز (تفصيل كامل في Part 11)

أي كلاس معرَّف بـ `@Injectable()` يمكن أن يكون Provider — أي يمكن حقنه في كلاس آخر. `Service` هو **الاسم الشائع** لهذا النمط (وليس نوعًا خاصًا في NestJS نفسه)، مخصَّص عادة لاحتواء منطق العمل.

### Dependency Injection بإيجاز (تفصيل كامل في Part 8)

بدل أن يُنشئ `UsersController` نسخة من `UsersService` بنفسه (`new UsersService(...)`)، يطلبها فقط في الـ constructor، وNestJS "يحقنها" له تلقائيًا:

```ts
constructor(private readonly usersService: UsersService) {}
```

### main.ts — نقطة الإقلاع

هذا هو أول ملف يُنفَّذ في التطبيق بأكمله. الكود الكامل (من `src/main.ts`) مع شرح كل خطوة:

```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger }); // 1
  const configService = app.get(ConfigService);                 // 2

  app.connectMicroservice<MicroserviceOptions>({                // 3
    transport: Transport.RMQ,
    options: {
      urls: [configService.get<string>('RABBITMQ_URL')],
      queue: 'email_queue',
      queueOptions: { durable: true },
    },
  });
  await app.startAllMicroservices();                            // 4

  app.enableCors();                                              // 5
  app.setGlobalPrefix('api');                                    // 6
  app.useGlobalPipes(new ValidationPipe({                        // 7
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  app.useGlobalFilters(new AllExceptionsFilter());                // 8

  const swaggerConfig = new DocumentBuilder()                     // 9
    .setTitle('Fitness App API')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document);

  const port = configService.get<number>('PORT') || 3000;         // 10
  await app.listen(port, '0.0.0.0');                              // 11
}
void bootstrap();                                                 // 12
```

| # | السطر | ماذا يفعل؟ |
|---|---|---|
| 1 | `NestFactory.create(AppModule, {logger})` | يبني التطبيق الكامل بدءًا من الموديول الجذر (`AppModule`)، مستخدِمًا الـ Winston logger المخصَّص بدل الافتراضي. |
| 2 | `app.get(ConfigService)` | يجلب نسخة `ConfigService` يدويًا (خارج DI العادي) لاستخدامها هنا في `bootstrap()` نفسها. |
| 3-4 | `connectMicroservice` + `startAllMicroservices` | يضيف اتصال RabbitMQ **بالإضافة** إلى HTTP العادي — هذا ما يجعل التطبيق "hybrid" (سنشرحه في Part 6 وPart 24). |
| 5 | `enableCors()` | يسمح لأي أصل (origin) بالاتصال بالـ API (بلا قيود — نناقش هذا كثغرة في Part 27). |
| 6 | `setGlobalPrefix('api')` | كل مسار في التطبيق يصبح تلقائيًا مسبوقًا بـ `/api` — لهذا `@Controller('auth')` يصبح فعليًا `/api/auth`. |
| 7 | `useGlobalPipes(new ValidationPipe(...))` | يُفعِّل التحقق التلقائي من كل DTO في كل مكان (تفصيل كامل في Part 10 وPart 17). |
| 8 | `useGlobalFilters(new AllExceptionsFilter())` | يوحّد شكل كل خطأ في التطبيق (تفصيل كامل في Part 20). |
| 9 | `SwaggerModule` | يبني توثيق API تفاعلي تلقائيًا من الـ Decorators، متاح على `/api-docs`. |
| 10-11 | `PORT` + `app.listen` | يحدد المنفذ من متغيرات البيئة (أو 3000 افتراضيًا) ويبدأ الاستماع فعليًا. |
| 12 | `void bootstrap()` | ينفّذ الدالة؛ `void` هنا يخبر TypeScript صراحةً "لا تنتظر Promise هذه الدالة، وهذا مقصود" (تسكيت تحذير linter). |

### AppModule — الجذر

من `src/app.module.ts` (مختصر):
```ts
@Module({
  imports: [
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        // ...
        synchronize: configService.get<string>('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
    MailModule, UsersModule, OnboardingModule, AuthModule,
    CategoryModule, CategoryGroupModule, CategorySegmentModule,
    WorkoutModule, FoodModule, AiChatModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
```

هذا هو "الجذر" الذي يجمع **كل** موديولات المشروع في مكان واحد. لاحظ نمطين مهمين ستراهما مرارًا في NestJS:

- **`forRoot(...)`**: إعداد **مرة واحدة على مستوى التطبيق كله** (هنا: إعدادات Throttler العامة).
- **`forRootAsync({useFactory, inject})`**: نفس الفكرة، لكن الإعداد يحتاج قيمًا **غير متزامنة أو من DI** (هنا: نحتاج `ConfigService` لقراءة متغيرات قاعدة البيانات أولاً، لذلك لا يمكن كتابة الإعداد كقيمة ثابتة عادية).

---

# PART 5 — NestJS Request Lifecycle

> هذا الجزء **الأهم** لفهم "كيف يتحرك الطلب فعليًا" داخل أي تطبيق NestJS. سنبدأ بالنموذج الذهني العام، ثم نستخرج flow **مشروعنا الحقيقي** من الكود — وهو مختلف قليلاً عن النموذج "الكامل" النظري.

### النموذج الذهني العام (الكامل نظريًا)

في أي تطبيق NestJS، الطلب **يمكن نظريًا** أن يمر بهذا الترتيب:

```mermaid
flowchart TD
  A[Client] --> B[HTTP Request]
  B --> C[Middleware]
  C --> D[Guards]
  D --> E[Interceptors - before]
  E --> F[Pipes]
  F --> G[Controller Handler]
  G --> H[Service]
  H --> I[Repository / ORM]
  I --> J[(Database)]
  J --> H
  H --> G
  G --> K[Interceptors - after]
  K --> L[HTTP Response]
  L --> A
```

كل مرحلة لها دور محدَّد جدًا:

| المرحلة | ماذا تفعل؟ | متى تعمل؟ | ماذا يدخل؟ | ماذا تخرج؟ |
|---|---|---|---|---|
| **Middleware** | معالجة عامة قبل أي شيء آخر (تسجيل، تعديل الطلب) | قبل تحديد أي Route Handler حتى | `Request`, `Response`, `next()` | تستدعي `next()` للمتابعة |
| **Guards** | يقرر: هل يُسمح بهذا الطلب أصلاً؟ | بعد Middleware، قبل كل شيء آخر | `ExecutionContext` | `true`/`false` (أو يرمي استثناء) |
| **Interceptors (قبل)** | تعديل/مراقبة قبل وصول الطلب للـ Handler | بعد Guards، قبل Pipes | `ExecutionContext`, `CallHandler` | يستدعي `next.handle()` |
| **Pipes** | تحويل/تحقق من البيانات الداخلة (Body, Params, Query) | قبل تنفيذ الـ Handler، لكل معامل | القيمة الخام | القيمة المحوَّلة، أو يرمي خطأ |
| **Controller Handler** | الدالة الفعلية التي كتبتها | بعد نجاح كل ما سبق | معاملات محوَّلة | نتيجة (أو Promise لها) |
| **Interceptors (بعد)** | تعديل الاستجابة قبل إرسالها | بعد رجوع الـ Handler | نتيجة الـ Handler | نتيجة معدَّلة |
| **Exception Filters** | يلتقط أي خطأ حدث في أي مرحلة | عند رمي أي استثناء | الخطأ | استجابة خطأ موحّدة |

### الـ Flow الحقيقي لمشروعنا (مُستخرَج من الكود)

بالبحث الكامل في المشروع: **لا يوجد أي Middleware مخصَّص** (لا `NestModule.configure` في أي مكان). لذلك الـ flow الفعلي أبسط قليلاً من النموذج النظري:

```mermaid
flowchart TD
  A[Client] --> B["HTTP Request → /api/..."]
  B --> C["Global ValidationPipe (يُشغَّل ضمنيًا هنا فعليًا عبر Pipes)"]
  C --> D{"Guards معرَّفة على الـ Controller؟<br/>AuthGuard ثم RolesGuard بهذا الترتيب"}
  D -- رفض --> X["AllExceptionsFilter → 401/403"]
  D -- سماح --> E["Interceptors: لا يوجد أي Interceptor مُفعَّل فعليًا في هذا المشروع"]
  E --> F["Pipes على مستوى المسار: ParseIntPipe / ParseUUIDPipe / createImageValidation"]
  F --> G[Controller Handler]
  G --> H[Service]
  H --> I["Repository (TypeORM)"]
  I --> J[(PostgreSQL)]
  J --> H
  H --> G
  G --> K["Response (بلا أي Interceptor يعدّلها)"]
  K --> L[Client]
  G -. Exception .-> X
```

**الفروق المهمة بين النموذج النظري ومشروعنا الفعلي:**

1. **لا Middleware مطلقًا.** كل معالجة عامة تتم إما عبر Guards أو عبر الإعداد العام في `main.ts` (مثل `ValidationPipe`).
2. **الـ ValidationPipe فعليًا Pipe عام** مسجَّل في `main.ts` عبر `app.useGlobalPipes(...)` — من الناحية التقنية يعمل ضمن مرحلة Pipes، لكنه مسجَّل مرة واحدة لكل التطبيق بدل تكراره على كل مسار.
3. **لا يوجد أي Interceptor فعّال.** يوجد `TransformInterceptor` مكتوب في الكود (`src/common/interceptors/transform.interceptor.ts`) لكنه **غير مربوط أبدًا** — لا `app.useGlobalInterceptors()`، ولا `@UseInterceptors()` على أي Controller. تفصيل كامل في [Part 18](#part-18--interceptors).
4. **الأخطاء دائمًا تنتهي في مكان واحد**: `AllExceptionsFilter`، بغض النظر عن أي مرحلة رمت الخطأ (Guard رفض، Pipe فشل تحقق، Service رمى `NotFoundException`).

### مثال: تتبّع طلب حقيقي خطوة بخطوة

لنتتبّع `PATCH /api/users/profile` (تعديل بروفايل) عبر كل مرحلة فعلية:

```mermaid
sequenceDiagram
  participant C as Client
  participant VP as Global ValidationPipe
  participant AG as AuthGuard
  participant RG as RolesGuard
  participant Ctrl as UsersController
  participant Svc as UsersService
  participant DB as PostgreSQL

  C->>VP: PATCH /api/users/profile + Body + Bearer token
  VP->>VP: تحقق شكل UpdateProfileDto (وإلا 400 فورًا)
  VP->>AG: الطلب صالح الشكل، تابع
  AG->>DB: findById(userId من التوكن)
  DB-->>AG: UserEntity
  AG->>RG: request.user = UserEntity، تابع
  RG->>RG: لا @Roles على هذا المسار تحديدًا → سماح لأي مستخدم مُصادَق
  RG->>Ctrl: updateProfile(req, dto)
  Ctrl->>Svc: usersService.updateProfile(req.user.id, dto)
  Svc->>DB: findById ثم save(...)
  DB-->>Svc: UserEntity المحدَّث
  Svc-->>Ctrl: UserEntity
  Ctrl-->>C: 200 + JSON (الكيان مباشرة، بلا غلاف — راجع Part 20)
```

**ملاحظة تقنية مهمة**: من ناحية الترتيب الفعلي داخل NestJS، الـ Guards تُنفَّذ **قبل** أن تُعالَج معاملات الـ Handler بالكامل عبر الـ Pipes الخاصة بالمسار (لكن الـ ValidationPipe العام كـ "pipe عام" يُطبَّق كجزء من معالجة كل معامل، والتي تحدث فعليًا بعد الـ Guards وقبل استدعاء دالة الـ Controller). الترتيب العملي الذي تحتاج تذكّره: **Guards أولاً دائمًا** (لا فائدة من التحقق من شكل البيانات إن كان المستخدم أصلاً غير مصرَّح له).

---

# PART 6 — Project Architecture

> بعد فهم كيف يتحرك طلب واحد، السؤال التالي: كيف يتنظّم **المشروع كله**؟

### الصورة الكبيرة

```mermaid
flowchart TD
  Sys["النظام (Super Fitness API)"] --> Mods["Modules (12 موديول ميزة)"]
  Mods --> Resp["مسؤولية كل موديول"]
  Resp --> Dep["الاعتماديات بين الموديولات"]
  Dep --> Flow["تدفق البيانات (Controller→Service→Repository→DB)"]
```

هذا المشروع **Modular Monolith**: تطبيق واحد (عملية Node واحدة)، لكن منظَّم داخليًا كموديولات مستقلة بحدود واضحة — على عكس Microservices الحقيقية (عمليات/نُشر منفصلة تمامًا). الاستثناء الوحيد: اتصال RabbitMQ الهجين لغرض واحد فقط (البريد الإلكتروني) — نفس العملية، لكنها "تتحدث" أيضًا كـ microservice consumer/producer.

### لماذا تم تقسيم المشروع بهذه الطريقة؟

**Feature-based** (تقسيم حسب الميزة، وليس حسب الطبقة التقنية) — أي أن `src/modules/auth/` يحتوي على **كل شيء** يخص المصادقة (controller+service+dto+entity)، بدل أن يكون هناك مجلد `controllers/` عام يضم كل الـ controllers من كل الميزات. هذا هو النمط **الموصى به رسميًا** من NestJS لأي مشروع متوسط-كبير، لأنه:

- يسهل إيجاد كل ما يخص ميزة معيّنة في مكان واحد.
- يقلل التصادم بين المطورين (كل شخص يعمل داخل موديول مختلف).
- يجعل حذف/فصل ميزة كاملة لاحقًا (كـ microservice منفصل مثلاً) أسهل بكثير.

### مسؤولية كل موديول

| الموديول | المسؤولية |
|---|---|
| `AuthModule` | دورة حياة الهوية: تسجيل، دخول، خروج، استرجاع كلمة مرور، تغيير بريد |
| `UsersModule` | بروفايل المستخدم + خطوات onboarding الثلاث + تغيير كلمة المرور |
| `OnboardingModule` | شرائح تعريفية إدارية (CMS) — **ليست** خطوات onboarding المستخدم |
| `CategoryModule` / `CategoryGroupModule` / `CategorySegmentModule` | 3 مستويات من هرم تصنيف التمارين |
| `WorkoutModule` | التمارين الفعلية (فيديو + بيانات) |
| `FoodModule` | الأطعمة ومكوناتها |
| `AiChatModule` + `AiModule` | جلسات/رسائل الدردشة مع الذكاء الاصطناعي |
| `MailModule` | إرسال البريد (المستهلك الفعلي لطابور RabbitMQ) |

### كيف تتواصل الموديولات؟

طريقتان فقط في هذا المشروع:

1. **استيراد Nest module مباشر (متزامن، الأغلبية الساحقة)**: موديول يستورد موديولاً آخر عبر `imports: [...]` ليستخدم ما يُصدِّره (عادة `Service`). مثال: `AuthModule` يستورد `UsersModule` لاستخدام `UsersService` داخل `AuthGuard`.
2. **RabbitMQ (غير متزامن، لغرض واحد فقط)**: `AuthModule` يُصدر رسالة `'email.send'` عبر `ClientProxy`، و`MailModule` (تحديدًا `MailProcessor`) يستهلكها عبر `@EventPattern('email.send')` — بلا أي استيراد مباشر بين الموديولين.

```mermaid
flowchart TD
  App[AppModule] --> Auth[AuthModule]
  App --> Users[UsersModule]
  App --> Onboarding[OnboardingModule]
  App --> Category[CategoryModule]
  App --> CategoryGroup[CategoryGroupModule]
  App --> CategorySegment[CategorySegmentModule]
  App --> Workout[WorkoutModule]
  App --> Food[FoodModule]
  App --> AiChat[AiChatModule]
  App --> Mail[MailModule]

  Auth --> Users
  Onboarding --> Users
  Workout --> Users
  Food --> Users
  Category --> Users
  Category --> Workout
  CategoryGroup --> Users
  CategoryGroup --> Workout
  CategorySegment --> Users
  CategorySegment --> Workout
  AiChat --> Ai["AiModule (Global)"]

  Auth -. "RMQ: emit('email.send')" .-> RMQ[(RabbitMQ)]
  Mail -. "RMQ: @EventPattern('email.send')" .-> RMQ
```

> **ملاحظة من `PROJECT_ANALYSIS.md`**: `Category`, `CategoryGroup`, `CategorySegment` الثلاثة تستورد `WorkoutModule` رغم أن أيًا من خدماتها لا تحقن `WorkoutService` فعليًا. هذا على الأرجح أثر جانبي من نسخ موديول كقالب دون تنظيف — درس عملي جيد: **استيراد موديول لا يعني بالضرورة أنه مُستخدَم فعليًا**، تحقق دائمًا من الـ constructor الفعلي للـ Service.

### أين توجد Business Logic؟ أين Database Logic؟ أين Shared Logic؟

هذا التقسيم الأفقي (عبر كل الموديولات) واضح جدًا في هذا المشروع:

```mermaid
flowchart LR
  subgraph Controller["طبقة الـ HTTP (Controller)"]
    direction TB
    C1["تعريف المسار + Guards + شكل البيانات (DTO) فقط"]
  end
  subgraph Service["طبقة منطق العمل (Service)"]
    direction TB
    S1["كل قرار، تحقق عمل، تنسيق بين أكثر من مصدر بيانات"]
  end
  subgraph Repo["طبقة قاعدة البيانات (Repository/Entity)"]
    direction TB
    R1["القراءة/الكتابة الفعلية + تعريف الجدول والعلاقات"]
  end
  subgraph Common["Shared Logic (src/common/)"]
    direction TB
    SH1["Guards, Pipes, Decorators, Filters, Utils — تُستخدم من أي موديول"]
  end
  Controller --> Service --> Repo
  Common -.-> Controller
  Common -.-> Service
```

- **Business Logic**: بالكامل داخل `*.service.ts`. Controllers **نحيفة جدًا** — أغلبها سطر واحد يستدعي الـ Service مباشرة.
- **Database Logic**: داخل `*.entity.ts` (تعريف الشكل والعلاقات) وداخل استدعاءات `Repository<T>` من كل Service (لا طبقة Repository مخصَّصة إضافية — Service يستخدم `Repository<T>` من TypeORM مباشرة).
- **Shared Logic**: كل شيء تحت `src/common/` — Guards (`AuthGuard`, `RolesGuard`)، Decorators (`@Roles`, `@User`)، Pipes (تحقق الملفات)، Filter (`AllExceptionsFilter`)، خدمات مشتركة (`CloudinaryService`)، وأدوات عامة (`enums.ts`, `constants.ts`, `otp.util.ts`).

### هل توجد Architectural Smells؟

نعم، أبرزها (تفصيل كامل في `PROJECT_ANALYSIS.md` §22):

- استيرادات/حقن غير مُستخدَمة متكررة عبر عدة موديولات (نمط نسخ/لصق).
- لا طبقة Repository مجرَّدة — استخدام `Repository<T>` من TypeORM مباشرة داخل كل Service (مقبول تمامًا لحجم مشروع كهذا، لكنه يعني ربطًا مباشرًا بـ TypeORM API في كل مكان).
- شكل الاستجابات الناجحة غير موحّد بين الموديولات (تفصيل في Part 20).

---

# PART 7 — Project Structure

> فهم "لماذا يوجد كل ملف/مجلد" — ليس فقط "ماذا يوجد فيه".

```mermaid
flowchart TD
  Root["Root المشروع"] --> Src[src/]
  Root --> Docs[docs/]
  Root --> Docker["Dockerfile, docker-compose.*.yml"]
  Root --> Config["package.json, tsconfig.json, nest-cli.json, eslint.config.mjs"]
  Src --> Main[main.ts]
  Src --> AppMod[app.module.ts]
  Src --> Common[common/]
  Src --> Modules[modules/]
```

### جدول الملفات الجذرية (Mental Model لكل واحد)

| الملف/المجلد | الغرض | المسؤولية | من يستخدمه؟ | لماذا موجود؟ |
|---|---|---|---|---|
| `src/main.ts` | نقطة الإقلاع الوحيدة | يبني ويشغّل التطبيق | يُشغَّل مرة واحدة عند البدء | كل تطبيق Node يحتاج نقطة دخول واحدة معروفة |
| `src/app.module.ts` | الجذر التنظيمي | يجمع كل الموديولات في واحد | `main.ts` عبر `NestFactory.create` | NestJS يحتاج موديولاً جذريًا واحدًا للبدء منه |
| `src/common/` | كود مشترك عابر للموديولات | Guards, Pipes, Decorators, Filters, Utils | أي موديول يحتاج مصادقة/تحقق/أدوات | تجنّب تكرار نفس الكود (Guards, Filters) في كل موديول |
| `src/modules/` | كل ميزات المشروع | كل موديول ميزة مستقل | `app.module.ts` يستوردها | تقسيم حسب الميزة (شُرح في Part 6) |
| `package.json` | هوية المشروع + الاعتماديات | يعرّف السكربتات والمكتبات | `npm`, Docker, CI (لو وُجد) | معيار Node.js القياسي |
| `tsconfig.json` | إعدادات TypeScript compiler | يحدد صرامة الفحص، الإصدار المستهدَف | `tsc` عند البناء، محرر الكود | يتحكم في كل قاعدة TypeScript المطبَّقة |
| `nest-cli.json` | إعدادات أداة NestJS CLI | مسار الكود المصدري، أصول إضافية (`.hbs`) | `nest build` / `nest start` | يخبر NestJS CLI كيف يبني المشروع |
| `eslint.config.mjs` | قواعد جودة الكود | يفحص أخطاء/أنماط سيئة | `npm run lint`, Husky pre-commit | يفرض جودة موحّدة على الفريق |
| `Dockerfile`, `docker-compose.*.yml` | التغليف والنشر | بناء صورة التطبيق + تشغيل خدماته | Docker عند البناء/التشغيل | نشر متّسق بين كل البيئات (تفصيل Part 26) |

### داخل `src/common/` — لماذا كل ملف موجود؟

| الملف | الغرض |
|---|---|
| `decorators/roles.decorator.ts` | يعرّف `@Roles(...)` — Custom Decorator لوضع metadata الأدوار المطلوبة على مسار |
| `decorators/user.decorator.ts` | يعرّف `@User(field?)` — اختصار لقراءة `request.user` مباشرة كمعامل |
| `interceptors/transform.interceptor.ts` | (غير مُفعَّل حاليًا) يهدف لتوحيد شكل الاستجابات الناجحة |
| `interface/userreq.interface.ts` | يعرّف نوع `Request` + `user` المضاف بعد المصادقة |
| `pipes/file-validation.pipe.ts` | يبني قاعدة تحقق ملفات الصور (نوع + حجم) قابلة لإعادة الاستخدام |
| `services/cloudinary.service.ts` | كل التفاعل مع Cloudinary (رفع/حذف صور وفيديو) في مكان واحد |
| `services/guards/auth/auth.guard.ts` | يتحقق من JWT ويحقن المستخدم في الطلب |
| `services/guards/auth/roles.guard.ts` | يقارن دور المستخدم بالأدوار المطلوبة على المسار |
| `utils/constants.ts` | ثوابت عامة (مثل مفتاح `GEMINI_MODEL` للحقن) |
| `utils/enums.ts` | كل الـ enums المشتركة عبر المشروع (`UserType`, `GoalType`، إلخ) |
| `utils/otp.util.ts` | توليد رمز OTP عشوائي وآمن |
| `utils/types.ts` | أنواع TypeScript مشتركة (`JwtPayload`) |
| `utils/fitness-prompt.ts` | نص الـ System Prompt الثابت لمساعد الذكاء الاصطناعي |
| `logger.ts` | إعداد Winston Logger المستخدَم في التطبيق بأكمله |
| `all-exceptions.filter.ts` | توحيد كل الأخطاء في شكل استجابة واحد |
| `health.controller.ts` | مسار `/health` لفحص جاهزية الخدمة (يستخدمه Docker) |

### داخل موديول ميزة نموذجي — Mental Model المتكرر

كل موديول ميزة (مثل `workout/`) يتبع تقريبًا نفس البنية:

```
modules/workout/
├── workout.module.ts       ← يجمع كل ما يلي في وحدة واحدة
├── workout.controller.ts   ← نقاط الاتصال HTTP
├── workout.service.ts      ← منطق العمل الفعلي
├── entity/workout.entity.ts← تعريف الجدول والعلاقات
└── dto/
    ├── create-workout.dto.ts
    ├── update-workout.dto.ts   ← عادة PartialType(Create...)
    └── query-workout.dto.ts    ← لمعاملات الفلترة/الترقيم في GET
```

**ما يجب أن تحفظه**: بمجرد أن تفهم هذا الهيكل مرة، تستطيع فتح **أي** موديول جديد في المشروع (أو في مشروع NestJS آخر يتبع نفس الاتفاقية) وتتوقع أين تجد كل شيء دون بحث.

---

# PART 8 — Dependency Injection

### المشكلة التي يحلّها

تخيّل `AuthService` بلا Dependency Injection — يحتاج `Repository<UserEntity>`، `JwtService`، `ConfigService`، وعميل RabbitMQ. بدون DI، سيضطر لإنشائها بنفسه:

```ts
class AuthService {
  private userRepository = new Repository(UserEntity, /* اتصال قاعدة بيانات حقيقي؟ */);
  private jwtService = new JwtService(/* إعدادات من أين؟ */);
  // ...
}
```

هذا يخلق مشاكل حقيقية:
- **ترابط قوي (Tight Coupling)**: `AuthService` أصبح مسؤولاً عن معرفة كيف يُبنى كل اعتمادياته، وليس فقط استخدامها.
- **استحالة الاختبار**: لا يمكن استبدال `userRepository` بنسخة وهمية (mock) في الاختبارات لأنها مبنية داخل الكلاس نفسه.
- **تكرار**: لو 5 خدمات تحتاج نفس `ConfigService`، كل واحدة تُنشئ نسخة منفصلة بدل مشاركة نسخة واحدة.

### ما معنى Dependency؟ ما معنى Injection؟

- **Dependency (اعتمادية)**: أي كائن يحتاجه كلاسك ليعمل، لكنه **لا** يُنشئه بنفسه.
- **Injection (حقن)**: تمرير تلك الاعتمادية من **الخارج** (عادة عبر الـ constructor)، بدل بنائها من الداخل.

### كيف تعمل في NestJS؟

NestJS يحتفظ بـ **حاوية (IoC Container)** تعرف كيف تبني كل Provider مسجَّل في التطبيق. عندما يطلب كلاس اعتمادية في constructor الخاص به، الحاوية:

1. تنظر إلى **النوع** المطلوب (مثلًا `JwtService`).
2. تبحث: هل هذا النوع مسجَّل كـ Provider في نفس الموديول (أو موديول مستورَد صدّره)؟
3. إن وُجد: تبني نسخة منه (أو تعيد نسخة موجودة مسبقًا — الافتراضي **Singleton**، نسخة واحدة تُشارَك في كل التطبيق) وتُمررها.
4. إن لم يُوجد: خطأ عند بدء التطبيق (`Nest can't resolve dependencies...`) — **وليس** عند تشغيل الكود لاحقًا؛ هذا اكتشاف مبكر جدًا للأخطاء.

```mermaid
flowchart LR
  A["AuthController"] -- "يطلب AuthService" --> IoC["IoC Container (حاوية NestJS)"]
  IoC -- "يبحث في providers الموديول" --> Found{وُجد؟}
  Found -- نعم --> Build["يبني/يعيد نسخة AuthService الجاهزة (ومعها كل اعتمادياتها هي أيضًا)"]
  Build --> A
  Found -- لا --> Err["خطأ عند الإقلاع"]
```

### Providers

أي كلاس معرَّف بـ `@Injectable()` ومُدرَج داخل `providers: [...]` في `@Module()` يصبح "متاحًا للحقن" داخل ذلك الموديول (وأي موديول يستورده إن كان مُصدَّرًا).

### Constructor Injection (النمط المستخدَم 100% في هذا المشروع)

```ts
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(PasswordResetEntity)
    private readonly passwordResetRepository: Repository<PasswordResetEntity>,

    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject('EMAIL_QUEUE') private readonly emailClient: ClientProxy,
  ) {}
}
```
من `src/modules/auth/auth.service.ts`. خمس اعتماديات مختلفة، كلها محقونة تلقائيًا — `AuthService` لا يعرف **كيف** بُنيت أي منها.

### Tokens (كيف تعرف الحاوية "أي كائن بالضبط"؟)

عادةً، **النوع نفسه** هو الـ Token (`JwtService` كنوع = `JwtService` كمفتاح بحث — ممكن بفضل `emitDecoratorMetadata` كما ذكرنا في Part 2). لكن أحيانًا نحتاج مفتاحًا **مخصَّصًا** (نص أو رمز)، غالبًا عندما لا يكون هناك "نوع كلاس" واضح — مثل قيمة أُنشئت عبر `useFactory`. هنا يُستخدم `@Inject('TOKEN_NAME')`:

```ts
@Inject('EMAIL_QUEUE') private readonly emailClient: ClientProxy,
```
لماذا؟ لأن `ClientProxy` هو نوع **عام** تستخدمه عدة اتصالات مختلفة محتملة (RMQ، Redis، إلخ) — الاسم `'EMAIL_QUEUE'` هو ما يحدد **أي** اتصال ClientProxy تحديدًا نريده.

### Custom Providers (`useFactory`) — مثال حقيقي كامل

من `src/modules/ai/ai.module.ts`:
```ts
@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    ConfigService,
    {
      provide: GEMINI_MODEL,                              // ← الـ Token
      useFactory: (configService: ConfigService) => {      // ← كيف نبني القيمة
        return new ChatGoogleGenerativeAI({
          apiKey: configService.get<string>('GOOGLE_API_KEY'),
          model: 'gemini-3-flash-preview',
          temperature: 0.7,
        });
      },
      inject: [ConfigService],                              // ← ما يحتاجه الـ factory نفسه
    },
  ],
  exports: [GEMINI_MODEL],
})
export class AiModule {}
```
`GEMINI_MODEL` هنا ثابت نصي (`'GEMINI_MODEL'` من `src/common/utils/constants.ts`) وليس كلاسًا — لهذا **يجب** استخدام `provide`/`useFactory` بدل التسجيل المباشر، ولهذا في `AiChatService` يُحقَن بـ `@Inject(GEMINI_MODEL)`:
```ts
@Inject(GEMINI_MODEL) private readonly geminiModel: ChatGoogleGenerativeAI,
```

### Project Implementation — أين يُستخدم DI في المشروع؟

**كل مكان تقريبًا.** كل `constructor` في كل `*.service.ts`, `*.guard.ts`, وحتى بعض الـ Controllers، هو استخدام لـ DI. أبرز الأمثلة:

- `AuthService` (5 اعتماديات مختلفة، مذكورة أعلاه).
- `AuthGuard` يحقن `JwtService`, `UsersService`, `ConfigService` — Guards هي كلاسات `@Injectable()` عادية أيضًا، تخضع لنفس نظام DI.
- `AiChatService` يحقن `DataSource` (TypeORM)، `GEMINI_MODEL` (عبر token مخصَّص)، ومستودعي `ChatSession`/`ChatMessage`.

### Flow — كيف يتم إنشاء وإعطاء الـ Dependency؟

```mermaid
sequenceDiagram
  participant Boot as NestFactory.create (main.ts)
  participant IoC as IoC Container
  participant AuthMod as AuthModule
  participant AuthSvc as AuthService
  participant AuthCtrl as AuthController

  Boot->>IoC: ابدأ ببناء AppModule وكل ما يستورده
  IoC->>AuthMod: اقرأ providers/imports الخاصة بـ AuthModule
  IoC->>AuthSvc: ابنِ AuthService (تحتاج أولاً بناء اعتمادياتها هي: Repository, JwtService...)
  IoC->>AuthCtrl: ابنِ AuthController، احقن نسخة AuthService الجاهزة في الـ constructor
  Note over IoC: كل هذا يحدث مرة واحدة فقط عند إقلاع التطبيق (Singleton scope)
  Boot->>Boot: التطبيق جاهز الآن لاستقبال الطلبات
```

**نقطة أساسية يجب تذكّرها**: كل هذا البناء يحدث **مرة واحدة عند إقلاع التطبيق**، وليس مع كل طلب HTTP. بحلول لحظة وصول أول طلب، كل الـ Providers جاهزة ومبنية سلفًا (السلوك الافتراضي هو `Scope.DEFAULT` أي Singleton — نسخة واحدة تُعاد استخدامها لكل الطلبات؛ المشروع لا يستخدم `Scope.REQUEST` في أي مكان).

### Without DI — ماذا كان سيحدث؟

- كل Service يحتاج معرفة **كيف** يبني كل اعتمادياته يدويًا — بما يعنيه ذلك من تكرار (كل مكان يحتاج `ConfigService` يعيد بناءه).
- استحالة عملية استبدال أي اعتمادية باختبار وهمي (mock) — وهذا **بالضبط** كيف تعمل اختبارات هذا المشروع الفعلية:

```ts
// من src/modules/auth/auth.service.spec.ts
const module: TestingModule = await Test.createTestingModule({
  providers: [
    AuthService,
    { provide: getRepositoryToken(UserEntity), useValue: mockUserRepository }, // ← استبدال حقيقي!
    { provide: JwtService, useValue: mockJwtService },
    { provide: ConfigService, useValue: mockConfigService },
    { provide: 'EMAIL_QUEUE', useValue: mockEmailClient },
  ],
}).compile();
```
هذا هو **السبب الحقيقي** وراء أهمية DI: `AuthService` الحقيقي يُختبَر هنا بلا أي اتصال قاعدة بيانات فعلي، لأن `Repository<UserEntity>` الحقيقي استُبدل بكائن وهمي (`mockUserRepository`) — ممكن **فقط** لأن `AuthService` لا يبني اعتمادياته بنفسه، بل يطلبها فقط.

---

# PART 9 — Controllers

### ما هو Controller؟

الطبقة الوحيدة في NestJS التي "تعرف" أنها تتحدث HTTP — تستقبل الطلب، تقرأ ما تحتاجه منه (Body/Params/Query/Headers)، تُفوِّض العمل الفعلي لـ Service، وتُعيد النتيجة.

### لماذا يوجد؟ ما مسؤوليته؟

الفصل بين "استقبال HTTP" و"تنفيذ منطق العمل" مقصود: يسمح باختبار منطق العمل (Service) بمعزل تام عن أي تفاصيل HTTP، ويسمح لاحقًا (نظريًا) بإضافة واجهة أخرى (مثل RPC أو CLI) تستدعي نفس الـ Services دون تكرار المنطق.

**قاعدة ذهبية رأيناها في كل مثال بالمشروع**: Controller **لا يجب** أن يحتوي قرارًا واحدًا من قرارات العمل (business logic) — فقط "استقبل، مرّر، أعد".

### HTTP Decorators

| Decorator | يستجيب لـ |
|---|---|
| `@Get()` | `GET` |
| `@Post()` | `POST` |
| `@Patch()` | `PATCH` |
| `@Delete()` | `DELETE` |
| `@Put()` | `PUT` *(غير مستخدَم في هذا المشروع)* |

كل واحد يقبل مسارًا فرعيًا اختياريًا: `@Get('profile')` داخل `@Controller('users')` = `GET /api/users/profile`.

### Parameter Decorators — كيف تقرأ بيانات الطلب

| Decorator | يقرأ من | مثال من المشروع |
|---|---|---|
| `@Body()` | جسم الطلب (JSON) | `@Body() loginDto: LoginDto` |
| `@Query()` / `@Query('x')` | Query string | `@Query('token') token: string` |
| `@Param('x')` | Route parameter | `@Param('id', ParseUUIDPipe) id: string` |
| `@Req()` / `@Request()` | كائن الطلب الكامل | `@Req() req: UserReq` |
| `@UploadedFile()` | ملف مرفوع (multipart) | `@UploadedFile() video?: Express.Multer.File` |

### مثال حقيقي كامل، مُشرَّح سطرًا سطرًا — `AuthController.login`

```ts
@Post('login')                             // POST /api/auth/login
@ApiOperation({ summary: 'User login' })   // توثيق Swagger فقط، لا تأثير وظيفي
@HttpCode(HttpStatus.OK)                   // النجاح الافتراضي لـ @Post هو 201، هنا نفرض 200 صراحة
login(@Body() loginDto: LoginDto) {        // خذ JSON من الجسم، تحقق منه وحوّله إلى LoginDto (عبر Pipe العام)
  return this.authService.login(loginDto); // فوّض كل المنطق لِـ Service — لا شيء آخر هنا
}
```
سطر واحد فعليًا هو "المنطق" — والباقي إعداد/تعريف مسار.

### مثال أكثر ثراءً — Controller محمي بحارسين + دور محدَّد

من `src/modules/workout/workout.controller.ts`:
```ts
@ApiTags('Workouts')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)   // ← على مستوى الكلاس: كل مسار هنا يحتاج مصادقة، والبعض دورًا أيضًا
@Controller('workouts')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Post()
  @Roles(UserType.ADMIN)                    // ← على مستوى الدالة: يُضاف فوق ما فرضه الكلاس
  @UseInterceptors(FileInterceptor('video')) // ← يهيّئ استخراج ملف من multipart قبل الوصول للـ Handler
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createWorkoutDto: CreateWorkoutDto,
    @UploadedFile() video?: Express.Multer.File,
  ) {
    return await this.workoutService.create(createWorkoutDto, video);
  }
}
```

**نمط مهم يتكرر في كل Controller محمي بالمشروع**: `@UseGuards(...)` على مستوى **الكلاس** تعني "طبّق هذا على كل مسار بداخله"، بينما `@Roles(...)` على مستوى **الدالة** تحدد تفصيلاً إضافيًا لهذا المسار تحديدًا. هذا يوفّر تكرار كتابة `@UseGuards` في كل دالة.

### لا تشرح كل Controller بنفس العمق — ركّز على الأنماط

المشروع يحتوي 11 Controller، لكنها تتبع **3 أنماط متكررة فقط**:

1. **Controller بلا حماية** (`HealthController` فقط) — مفتوح للجميع.
2. **Controller محمي بمصادقة فقط** (`AiChatController`) — `@UseGuards(AuthGuard)`، أي مستخدم مسجَّل دخول يمكنه الوصول.
3. **Controller محمي بمصادقة + دور محدَّد لكل مسار** (الأغلبية: Users, Onboarding, Category*, Workout, Food) — `@UseGuards(AuthGuard, RolesGuard)` على الكلاس، ثم `@Roles(...)` تختلف من دالة لأخرى (أحيانًا بلا `@Roles` إطلاقًا = أي مستخدم مصادَق).

بمجرد أن تفهم هذه الأنماط الثلاثة، فتح أي Controller جديد في المشروع يصبح **تعرّفًا على تفاصيل**، وليس تعلّمًا من الصفر.

---

# PART 10 — DTOs & Validation

### DTO — ما هو؟

**DTO** = Data Transfer Object. كلاس بسيط يعرّف **الشكل المتوقَّع** لبيانات قادمة (عادة من جسم الطلب)، مع قواعد تحقق (validation) مرفقة عليه عبر Decorators.

### لماذا DTO، وليس مجرد TypeScript type؟

هنا الفرق **الجوهري** الذي يجب أن تفهمه جيدًا:

| | `interface`/`type` عادي | DTO (كلاس + class-validator) |
|---|---|---|
| يفحص الشكل وقت الكتابة؟ | ✔ | ✔ |
| يفحص البيانات القادمة **فعليًا وقت التشغيل**؟ | ✘ (يختفي بعد الترجمة) | ✔ (الكلاس + الـ Decorators يبقيان موجودين وقت التشغيل) |

طلب HTTP قادم من الإنترنت **لا يملك أي نوع TypeScript** — إنه JSON خام، قد يحتوي أي شيء (نص بدل رقم، حقل مفقود، حقل زائد يحاول كسر شيء). الـ `interface` تحمي الكود **من نفسك** (مطوّر آخر يستخدم دالتك خطأ)، لكنها عاجزة تمامًا عن حماية التطبيق من بيانات خبيثة/خاطئة قادمة فعليًا من شبكة الإنترنت. الـ DTO (ككلاس مزوَّد بـ decorators من `class-validator`) هو ما يجعل هذا الفحص **يحدث فعليًا وقت التشغيل**.

### class-validator — كيف يعمل

مكتبة توفر Decorators جاهزة توضَع فوق حقول الكلاس. مثال حقيقي كامل من `src/modules/auth/dto/register.dto.ts`:
```ts
export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, {
    message: 'Password must contain uppercase, lowercase, number and special character',
  })
  password: string;
}
```
كل Decorator = قاعدة واحدة. يمكن تكديس أكثر من قاعدة على نفس الحقل (`password` هنا لديه 3 قواعد).

### ValidationPipe — من يُطبِّق هذه القواعد فعليًا؟

الـ Decorators وحدها **لا تفعل شيئًا** بدون شيء يقرأها وقت التشغيل وينفّذ الفحص. هذا بالضبط دور `ValidationPipe`، المُفعَّل **عالميًا** في `main.ts`:
```ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
);
```

| الخيار | ماذا يفعل | مثال أثره |
|---|---|---|
| `whitelist: true` | يحذف تلقائيًا أي حقل **غير معرَّف** في الـ DTO من الكائن النهائي | لو أرسل العميل `{email, password, isAdmin: true}` لـ `LoginDto` (يحتوي فقط `email`/`password`)، يُحذَف `isAdmin` بصمت |
| `forbidNonWhitelisted: true` | بدل الحذف الصامت، **يرفض الطلب بالكامل** (400) إن وُجد حقل غريب | نفس المثال أعلاه: بما أن كلا الخيارين مفعَّلان معًا، الطلب يُرفَض فورًا بدل أن يُحذَف الحقل بصمت |
| `transform: true` | يحوّل الكائن الخام (plain object من JSON) إلى **نسخة فعلية من كلاس الـ DTO**، ويحوّل الأنواع (نص→رقم مثلاً عبر `@Type(() => Number)`) | `?page=2` (نص من الـ URL) يصبح `page: 2` (رقم فعلي) في `QueryWorkoutDto` |

### Transformation — تحويل الأنواع في Query DTOs

من `src/modules/workout/dto/query-workout.dto.ts`:
```ts
export class QueryWorkoutDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)     // ← بدون هذا، القيمة تبقى نصًا "1" وليس رقمًا 1، و@IsInt سيفشل!
  page?: number = 1;
}
```
كل قيم Query String هي **نصوص دائمًا** (هذه طبيعة الـ URL). `@Type(() => Number)` (من `class-transformer`) يخبر `ValidationPipe` (بفضل `transform: true`) أن يحوّل النص لرقم **قبل** تطبيق `@IsInt()`/`@Min()` — بدون هذا السطر، `@IsInt()` سيفشل دائمًا لأن القيمة الأصلية نص.

### Whitelisting بالتفصيل — لماذا هذا مهم أمنيًا

هذا يمنع هجومًا شائعًا يُسمى **Mass Assignment**: لو لم يكن `whitelist`/`forbidNonWhitelisted` مفعَّلَين، وكان الـ Service يستخدم شيئًا مثل `Object.assign(user, dto)` (وهو بالضبط ما يفعله `UsersService.updateProfile` — سنراه في Part 11)، فإن عميلاً خبيثًا يمكنه نظريًا إرسال `{firstName:"x", type:"admin"}` ومحاولة رفع صلاحياته — لولا أن `whitelist` يحذف/يرفض أي حقل لم يُعرَّف صراحة في `UpdateProfileDto`.

### Custom Validation — هل يوجد في المشروع؟

لا يوجد class تحقق مخصَّص (custom `ValidatorConstraint`) في هذا المشروع — كل التحقق يعتمد على decorators جاهزة من `class-validator`. أقرب شيء لتحقق "مخصَّص" هو `createImageValidation()` في `src/common/pipes/file-validation.pipe.ts` (لكنه Pipe مخصَّص للملفات، وليس class-validator — سنشرحه في [Part 17](#part-17--pipes)).

### Flow الكامل

```mermaid
flowchart TD
  A["Client Input (JSON خام)"] --> B["DTO Class (تعريف الشكل + قواعد class-validator)"]
  B --> C["ValidationPipe العام (whitelist + forbidNonWhitelisted + transform)"]
  C -- فشل --> D["400 Bad Request + رسائل الأخطاء (تُجمَّع عبر AllExceptionsFilter)"]
  C -- نجاح --> E["Controller Handler (يستقبل نسخة DTO نظيفة ومحوَّلة)"]
```

### تطبيق على المشروع — مثال DTO للتحديث الجزئي

من `src/modules/category-segment/dto/update-category-segment.dto.ts`:
```ts
export class UpdateCategorySegmentDto extends PartialType(CreateCategorySegmentDto) {}
```
سطر واحد فقط! كما شرحنا في Part 2 (`PartialType`)، هذا يرث كل حقول `CreateCategorySegmentDto` (بقواعد التحقق نفسها) لكن **كلها اختيارية** الآن — النمط الأشيع لأي DTO تعديل (`PATCH`) في المشروع بأكمله.

---

# PART 11 — Services & Business Logic

### Service — تعريف عملي

أي كلاس `@Injectable()` يحمل **منطق العمل الفعلي** — القرارات، القواعد، الاستعلامات، التنسيق بين أكثر من مصدر بيانات. "Service" ليست كلمة محجوزة خاصة في NestJS (أي `@Injectable()` هو "Provider")، لكنها **الاسم الاصطلاحي** لهذا الدور تحديدًا في كل مشروع NestJS تقريبًا — بما فيه هذا المشروع (كل موديول لديه `*.service.ts`).

### Separation of Concerns — لماذا هذا الكود هنا وليس في الـ Controller؟

القاعدة: **Controller يعرف HTTP، Service يعرف قواعد العمل**. Controller لا يجب أن "يقرر" شيئًا — فقط يمرر ويستقبل. لنرَ هذا بمثال حقيقي دقيق:

```ts
// UsersController — Controller (من users.controller.ts)
@Patch('change-password')
async changePassword(@Request() req: UserReq, @Body() dto: ChangePasswordDto) {
  return await this.usersService.changePassword(req.user.id, dto); // سطر واحد، بلا قرار واحد
}
```

```ts
// UsersService — Service (من users.service.ts) — كل القرارات هنا
async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
  const user = await this.findById(userId);

  const isPasswordMatched = await bcrypt.compare(changePasswordDto.oldPassword, user.password);
  if (!isPasswordMatched) {
    throw new BadRequestException('Old password is incorrect');    // ← قرار عمل 1
  }

  const isSamePassword = await bcrypt.compare(changePasswordDto.newPassword, user.password);
  if (isSamePassword) {
    throw new BadRequestException('New password must be different from old password'); // ← قرار عمل 2
  }

  const hashedPassword = await bcrypt.hash(changePasswordDto.newPassword, 10);          // ← قرار عمل 3
  user.password = hashedPassword;
  await this.userRepository.save(user);
  return { message: 'Password changed successfully' };
}
```

**لماذا هذا التقسيم مفيد عمليًا؟**
1. **الاختبار**: نستطيع اختبار `changePassword` كاملاً (3 قرارات عمل + الحفظ) بلا أي خادم HTTP فعلي — كما يفعل `users.service.spec.ts` تمامًا.
2. **إعادة الاستخدام**: لو احتجنا "تغيير كلمة المرور" من مكان آخر غير HTTP (سكربت إداري مثلاً)، نستدعي `UsersService.changePassword` مباشرة، دون المرور بطبقة HTTP كاملة.
3. **الوضوح**: أي مطوّر يبحث عن "كيف تُغيَّر كلمة المرور فعليًا؟" يعرف بالضبط أين ينظر — دائمًا `*.service.ts`، أبدًا `*.controller.ts`.

### تحليل عميق: لماذا `WorkoutService.create()` معقّد نسبيًا؟

من `src/modules/workout/workout.service.ts` (مختصر):
```ts
async create(createWorkoutDto: CreateWorkoutDto, videoFile?: Express.Multer.File): Promise<Workout> {
  const { segmentId, ...workoutData } = createWorkoutDto;

  const segment = await this.categorySegmentRepository.findOne({ where: { id: segmentId } });
  if (!segment) {
    throw new NotFoundException(`Category segment with ID ${segmentId} not found`); // تحقق عمل: العلاقة يجب أن توجد فعلاً
  }

  let videoUrl: string | undefined;
  let videoPublicId: string | undefined;
  if (videoFile) {
    try {
      const uploadResult = await this.cloudinaryService.uploadVideo(videoFile, 'workouts/videos'); // تنسيق مع خدمة خارجية
      videoUrl = uploadResult.secure_url;
      videoPublicId = uploadResult.public_id;
    } catch {
      throw new BadRequestException('Failed to upload video');
    }
  }

  const workout = this.workoutRepository.create({ ...workoutData, segment, videoUrl, videoPublicId });
  return await this.workoutRepository.save(workout);
}
```
هذا مثال ممتاز على **لماذا** يجب أن يعيش هذا في Service: الدالة تنسّق بين **مصدرين مختلفين** (قاعدة البيانات عبر `categorySegmentRepository`، وخدمة خارجية عبر `cloudinaryService`) وتطبّق قاعدة عمل (لا يمكن إنشاء تمرين بدون `segment` موجود فعلاً). لو كان هذا داخل `Controller`، لأصبح الـ Controller "يعرف" تفاصيل Cloudinary وTypeORM معًا — بالضبط ما نريد تجنّبه.

### `AuthService` — لماذا يستحق دراسة كاملة

`AuthService` (`src/modules/auth/auth.service.ts`) هو **أنضج** Service في المشروع — يستحق قراءته كاملاً لاحقًا (سنعود له بالتفصيل في [Part 14](#part-14--authentication)). الآن، فقط لاحظ **النمط المتكرر** في كل دالة فيه:

```text
1. تحقق من وجود/صحة شيء (يرمي استثناء واضح إن فشل)
       ↓
2. نفّذ العملية الفعلية (bcrypt، JWT، حفظ قاعدة بيانات)
       ↓
3. أطلق أثرًا جانبيًا إن لزم (مثل إرسال بريد عبر RabbitMQ)
       ↓
4. أعد نتيجة منظَّمة (رسالة + بيانات)
```

### Business Logic لا تعني فقط "if/else" — تشمل التنسيق أيضًا

مثال آخر من `AiChatService.processUserMessage()` — هنا الـ Service ينسّق بين **3 أنظمة مختلفة تمامًا** في نفس الدالة: قاعدة بيانات (جلسة+رسائل)، معاملة (transaction)، ونموذج ذكاء اصطناعي خارجي (Gemini عبر LangChain). هذا النوع من التنسيق **لا مكان له** إلا داخل Service — لا Controller، ولا Entity، يجب أن يعرف كيف تُبنى محادثة مع نموذج LLM.

---

# PART 12 — Database

### ما هي قاعدة البيانات؟ (المفهوم العام)

مكان منظَّم لتخزين البيانات بشكل **دائم** (يبقى بعد إيقاف التطبيق)، بخلاف المتغيرات في الذاكرة التي تختفي عند إعادة التشغيل. نستخدم **قاعدة بيانات علائقية (Relational)** هنا: PostgreSQL — البيانات مقسَّمة إلى **جداول**، كل جدول له أعمدة ثابتة، وصفوف تمثّل السجلات الفعلية.

### المفاهيم الأساسية

| المفهوم | المعنى | مثال من المشروع |
|---|---|---|
| **Table (جدول)** | مجموعة سجلات من نفس النوع | جدول `users` |
| **Row (صف)** | سجل واحد فعلي | مستخدم واحد بعينه |
| **Column (عمود)** | حقل ثابت لكل صف | `email`, `password`, `age` |
| **Primary Key (المفتاح الأساسي)** | عمود يحدّد كل صف بشكل فريد لا يتكرر | `users.id` (UUID) |
| **Foreign Key (المفتاح الأجنبي)** | عمود في جدول يشير لمفتاح أساسي في جدول آخر — هكذا تُبنى العلاقات | `password_reset.userId` يشير لـ `users.id` |
| **Relationship (علاقة)** | كيف يرتبط جدول بآخر منطقيًا | مستخدم واحد له عدة طلبات استرجاع كلمة مرور |
| **Index (فهرس)** | بنية إضافية تُسرّع البحث في عمود معيّن (بتكلفة كتابة أبطأ قليلاً) | `@Index()` على `Workout.difficulty` |
| **Constraint (قيد)** | قاعدة تفرضها القاعدة نفسها (وليس الكود) | `unique:true` على `users.email` |
| **Transaction (معاملة)** | مجموعة عمليات تُنفَّذ كوحدة واحدة: إما تنجح كلها أو تفشل كلها | معاملة `AiChatService` (رسالة المستخدم + رد الذكاء الاصطناعي معًا) |

### أنواع العلاقات

```mermaid
erDiagram
  ONE_TO_MANY_PARENT ||--o{ ONE_TO_MANY_CHILD : "مستخدم واحد له عدة..."
  ONE_TO_ONE_A ||--|| ONE_TO_ONE_B : "قطاع واحد له إحصائية واحدة بالضبط"
```

- **One-to-Many**: سجل واحد في الجدول الأب يرتبط بعدة سجلات في جدول ابن. مثال: `users` ← `password_reset` (مستخدم واحد قد يملك عدة طلبات استرجاع سابقة).
- **One-to-One**: سجل واحد يرتبط بسجل واحد بالضبط في جدول آخر. مثال: `category_segments` ← `category_segment_stats` (كل قطاع له إحصائية واحدة بالضبط).
- **Many-to-Many**: (غير مستخدَمة في هذا المشروع — لا يوجد جدول وصل/join table في أي مكان).

### ORM — ما هو ولماذا؟

**ORM** (Object-Relational Mapper) هو طبقة تسمح لك بالتعامل مع قاعدة البيانات العلائقية عبر **كائنات وكلاسات** (بلغة برمجتك) بدل كتابة SQL خام في كل مكان. مشروعنا يستخدم **TypeORM**.

**لماذا؟**
- كتابة `this.userRepository.findOne({where:{email}})` أوضح وأأمن (يمنع SQL Injection تلقائيًا) من تركيب نص SQL يدويًا.
- العلاقات (Relations) تُعرَّف مرة واحدة في الكلاس، وتُستخدَم تلقائيًا (join تلقائي عبر `relations:[...]`).
- تبديل قاعدة البيانات (نظريًا) أسهل — الكود لا "يتحدث" SQL مباشرة.

### Entity — الترجمة بين الكلاس والجدول

كل `@Entity()` في المشروع = جدول واحد في PostgreSQL. مثال كامل مُشرَّح، من `src/modules/workout/entity/workout.entity.ts`:

```ts
@Entity('workouts')                          // اسم الجدول الفعلي في قاعدة البيانات
@Index(['difficulty'])                        // فهرس على عمود difficulty لتسريع الفلترة به
export class Workout {
  @PrimaryGeneratedColumn()                   // مفتاح أساسي، رقم تسلسلي تلقائي
  id: number;

  @Column()                                   // عمود عادي، نوعه يُستنتَج من TypeScript (string هنا)
  title: string;

  @Column({ type: 'text', nullable: true })   // عمود نصي طويل، يمكن أن يكون فارغًا (NULL)
  description: string;

  @ManyToOne(() => CategorySegment, { onDelete: 'CASCADE', eager: true }) // علاقة: كل تمرين ينتمي لقطاع واحد
  segment: CategorySegment;

  @Column({ type: 'enum', enum: WorkoutDifficulty, default: WorkoutDifficulty.BEGINNER })
  difficulty: WorkoutDifficulty;

  @CreateDateColumn()                         // يُملأ تلقائيًا عند الإنشاء
  createdAt: Date;

  @UpdateDateColumn()                         // يُحدَّث تلقائيًا عند كل save()
  updatedAt: Date;
}
```

| Decorator | المعنى |
|---|---|
| `@Entity('workouts')` | هذا الكلاس = جدول `workouts` |
| `@PrimaryGeneratedColumn()` | مفتاح أساسي رقمي تلقائي التزايد (Serial) |
| `@PrimaryGeneratedColumn('uuid')` | (مستخدَم في `UserEntity` مثلاً) مفتاح أساسي UUID عشوائي بدل رقم تسلسلي |
| `@Column(...)` | عمود عادي، مع خيارات (نوع، nullable، default، unique...) |
| `@ManyToOne(...)`, `@OneToMany(...)`, `@OneToOne(...)` | تعريف علاقة، مع خيار `onDelete` (ماذا يحدث للأبناء عند حذف الأب) و`eager` (هل تُحمَّل هذه العلاقة تلقائيًا مع كل استعلام؟) |
| `@CreateDateColumn()` / `@UpdateDateColumn()` | طوابع زمنية تُدار تلقائيًا من TypeORM |

### `onDelete: 'CASCADE'` — لماذا هذا الخيار موجود في كل علاقة تقريبًا؟

يعني: عند حذف السجل الأب، **احذف كل الأبناء المرتبطين به تلقائيًا** على مستوى قاعدة البيانات نفسها (وليس عبر كود يدوي). مثال حقيقي: حذف `WorkoutCategory` يحذف تلقائيًا كل `CategoryGroup` تحته، والتي بدورها تحذف كل `CategorySegment` تحتها، والتي تحذف كل `Workout` تحتها — سلسلة حذف كاملة بأمر واحد، بفضل `CASCADE` المُعرَّف في كل مستوى.

### Repository — كيف نستعلم فعليًا

`Repository<T>` (من Part 2، مثال على Generics) هو الكائن الذي نستخدمه فعليًا للقراءة/الكتابة:

```ts
@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
```

| الدالة | ماذا تفعل | مثال حقيقي من المشروع |
|---|---|---|
| `find(options?)` | يُعيد **مصفوفة** من السجلات | `this.userRepository.find()` (كل المستخدمين) |
| `findOne({where})` | يُعيد **سجلاً واحدًا أو null** | `this.userRepository.findOne({where:{email}})` |
| `findOneBy({...})` | اختصار لـ `findOne` بشرط بسيط | `this.userRepository.findOneBy({id})` |
| `create(data)` | يبني **كائنًا في الذاكرة** فقط (لا يحفظ بعد!) | `this.userRepository.create({firstName, email, ...})` |
| `save(entity)` | يحفظ فعليًا في القاعدة (إنشاء أو تحديث حسب وجود مفتاح أساسي) | `await this.userRepository.save(newUser)` |
| `update(id, partial)` | يُحدِّث مباشرة **بدون** تحميل الكائن أولاً | `this.userRepository.update(userId, {hashedRefreshToken: null})` |
| `delete(id)` / `remove(entity)` | حذف بالمفتاح مباشرة / حذف كائن مُحمَّل مسبقًا | `this.categoryRepo.delete(id)` |
| `createQueryBuilder(alias)` | بناء استعلام مركّب يدويًا (فلاتر، joins متعددة) | يُستخدم في `WorkoutService.findAll()` للفلترة المعقّدة |

### `create()` مقابل `save()` — فخ شائع للمبتدئين

```ts
const workout = this.workoutRepository.create({ ...workoutData, segment }); // لا يزال فقط في الذاكرة!
return await this.workoutRepository.save(workout);                         // الآن فقط يُكتَب فعليًا في القاعدة
```
`create()` **لا يلمس قاعدة البيانات إطلاقًا** — فقط يبني كائن TypeORM صحيح الشكل من بيانات خام. `save()` هو من يُنفّذ فعليًا استعلام `INSERT` (أو `UPDATE` إن كان الكائن يحمل مفتاحًا أساسيًا موجودًا مسبقًا).

### `createQueryBuilder` — عند الحاجة لاستعلامات مركّبة

من `src/modules/workout/workout.service.ts` (مختصر):
```ts
const queryBuilder = this.workoutRepository
  .createQueryBuilder('workout')
  .leftJoinAndSelect('workout.segment', 'segment')
  .leftJoinAndSelect('segment.group', 'group');

if (search) {
  queryBuilder.andWhere(
    '(workout.title ILIKE :search OR workout.description ILIKE :search)',
    { search: `%${search}%` },   // ← قيمة مُمرَّرة كـ parameter، ليست مُدمَجة في النص مباشرة
  );
}
```
**نقطة أمان مهمة جدًا**: لاحظ `{ search: `%${search}%` }` كمعامل ثانٍ منفصل عن نص الاستعلام. هذا يمنع **SQL Injection** — القيمة تُمرَّر عبر آلية "parameterized query" الآمنة من TypeORM، وليست مدمجة مباشرة داخل نص SQL (ما كان سيحدث لو كتبنا شيئًا مثل `` `WHERE title = '${search}'` `` يدويًا — **لا تفعل هذا أبدًا**).

### Migrations و Seeds — هل موجودة في هذا المشروع؟

**لا.** لا يوجد أي مجلد `migrations/` أو ملفات seed في المشروع. الاعتماد الكامل هو على `synchronize: true` في التطوير (من `app.module.ts`):
```ts
synchronize: configService.get<string>('NODE_ENV') === 'development',
```
`synchronize` يعني: عند إقلاع التطبيق، TypeORM يقارن تعريفات الـ Entities الحالية بالجداول الموجودة فعليًا في القاعدة، **ويُعدّل الجداول تلقائيًا** لتطابقها (يضيف أعمدة، يُنشئ جداول جديدة...). هذا **مريح جدًا في التطوير** (لا حاجة لكتابة migration يدوي لكل تعديل بسيط)، لكنه **خطير جدًا في الإنتاج** (قد يحذف/يُعدّل أعمدة تحتوي بيانات حقيقية دون تحكّم دقيق) — ولهذا السبب بالضبط يُعطَّل تلقائيًا عندما `NODE_ENV !== 'development'`. المشروع لا يملك حاليًا آلية migrations فعلية للإنتاج رغم أن الـ README يذكرها كمتطلَّب.

### Transactions — مثال حقيقي كامل

من `AiChatService.processUserMessage()`:
```ts
return await this.dataSource.transaction(async (transactionalEntityManager) => {
  const userMsg = this.chatMessageRepository.create({ content: userMessage, sender: SenderType.USER, session });
  await transactionalEntityManager.save(userMsg);          // 1. احفظ رسالة المستخدم

  const stream = await chain.stream({ /* ... */ });         // 2. استدعِ نموذج الذكاء الاصطناعي
  let fullResponse = '';
  for await (const chunk of stream) { fullResponse += chunk.content; }

  const aiMsg = this.chatMessageRepository.create({ content: fullResponse, sender: SenderType.AI, session });
  await transactionalEntityManager.save(aiMsg);             // 3. احفظ رد الذكاء الاصطناعي

  return { sessionId: session.id, response: fullResponse };
});
```
**لماذا Transaction هنا تحديدًا؟** لو فشل أي شيء بين الخطوة 1 والخطوة 3 (مثلًا: استدعاء Gemini فشل)، فإن `transaction()` **يتراجع تلقائيًا (rollback)** عن حفظ رسالة المستخدم أيضًا — نتيجة ذلك: إما أن تُحفَظ رسالة المستخدم **مع** رد الذكاء الاصطناعي معًا، أو لا يُحفَظ أي منهما. بدون Transaction، كنا سنخاطر بحفظ رسالة مستخدم "يتيمة" بلا رد إطلاقًا في حال فشل الاستدعاء الخارجي.

---

# PART 13 — Database Data Flow

> تتبّع كامل، من الطلب حتى الرد، مع كل اسم ملف/كلاس/دالة — هذا القسم يجمع كل ما تعلمناه في الأجزاء السابقة في تتبّع واحد ملموس.

### مثال: `PATCH /api/users/personal-info` (خطوة onboarding الأولى)

```mermaid
flowchart TD
  A["HTTP Request<br/>PATCH /api/users/personal-info<br/>Body: {gender, age}"] --> B["Global ValidationPipe<br/>يتحقق من UpdatePersonalInfoDto"]
  B --> C["AuthGuard<br/>src/common/services/guards/auth/auth.guard.ts"]
  C --> D["RolesGuard<br/>لا @Roles على هذا المسار → سماح"]
  D --> E["UsersController.stepOne()<br/>src/modules/users/users.controller.ts"]
  E --> F["UsersService.completeStepOne(userId, dto)<br/>src/modules/users/users.service.ts"]
  F --> G["userRepository.findOneBy({id}) عبر findById()"]
  G --> H[(جدول users)]
  H --> G
  G --> I["Object.assign(user, dto); user.currentStep = 1"]
  I --> J["userRepository.save(user)"]
  J --> H
  J --> K["إعادة UserEntity المحدَّث"]
  K --> L["UsersController يُعيد النتيجة كما هي"]
  L --> M["HTTP Response 200 + JSON"]
```

الكود الفعلي لكل خطوة:
```ts
// 1) Controller — users.controller.ts
@Patch('personal-info')
async stepOne(@Request() req: UserReq, @Body() dto: UpdatePersonalInfoDto) {
  return await this.usersService.completeStepOne(req.user.id, dto);
}

// 2) Service — users.service.ts
async completeStepOne(userId: string, dto: UpdatePersonalInfoDto) {
  const user = await this.findById(userId);   // 2.1 — استعلام SELECT
  Object.assign(user, dto);                    // 2.2 — تعديل في الذاكرة فقط
  user.currentStep = 1;                        // 2.3 — قاعدة عمل: سجّل تقدّم الخطوة
  return await this.userRepository.save(user); // 2.4 — استعلام UPDATE فعلي
}
```

**نقطة يجب فهمها جيدًا**: `Object.assign(user, dto)` يعمل بأمان هنا **لأن** `dto` مرّ مسبقًا عبر `ValidationPipe` مع `whitelist:true` — فهو يحمل **فقط** الحقول المسموح بها (`gender`, `age`)، وليس أي حقل عشوائي قد يرسله عميل خبيث.

### مثال ثانٍ: قراءة مع علاقات متعددة المستويات — `GET /api/workouts/:id`

```mermaid
flowchart TD
  A["GET /api/workouts/42"] --> B[AuthGuard + RolesGuard]
  B --> C["WorkoutController.findOne(id)"]
  C --> D["WorkoutService.findOne(42)"]
  D --> E["workoutRepository.findOne({where:{id:42}, relations:['segment','segment.group','segment.group.category']})"]
  E --> F["TypeORM يبني JOIN واحد مركّب عبر 4 جداول"]
  F --> G[(workouts JOIN category_segments JOIN category_groups JOIN workout_categories)]
  G --> E
  E -- "null؟" --> H["NotFoundException('Workout with ID 42 not found')"]
  E -- موجود --> I["Workout كامل، بعلاقاته الثلاث محمَّلة داخل نفس الكائن"]
  I --> J["200 + JSON متداخل (workout.segment.group.category)"]
  H --> K["AllExceptionsFilter → 404 موحّد"]
```

هذا يوضّح فائدة `relations: [...]` عمليًا: بدل 4 استعلامات منفصلة (تمرين، ثم قطاعه، ثم مجموعته، ثم تصنيفه)، TypeORM يبني **استعلامًا واحدًا** بـ JOINs متعددة، ويعيد كل شيء كبنية كائنات متداخلة جاهزة.

---

# PART 14 — Authentication

### المفهوم العام أولاً

**Authentication (المصادقة)** تجيب سؤالاً واحدًا: **"من أنت؟"** — إثبات هوية المتصل قبل السماح له بأي شيء آخر. الطريقة الكلاسيكية على الويب: المستخدم يثبت هويته **مرة واحدة** (بريد+كلمة مرور)، ويحصل مقابل ذلك على "دليل" (token/session) يرفقه مع كل طلب لاحق، بدل إعادة إرسال كلمة المرور في كل مرة.

### كلمات المرور — لماذا لا نخزّنها كما هي أبدًا

لو سُرقت قاعدة البيانات، وكانت كلمات المرور نصًا صريحًا، فكل حساب مخترَق فورًا. الحل: **Hashing** — دالة رياضية أحادية الاتجاه (one-way) تحوّل كلمة المرور لسلسلة غير قابلة للعكس. **bcrypt** هي الخوارزمية المستخدَمة هنا، وهي مصمَّمة خصيصًا لتكون **بطيئة عمدًا** (بخلاف MD5/SHA العادية السريعة جدًا)، لتُصعِّب هجمات التخمين الآلي (brute-force).

```ts
const hashedPassword = await bcrypt.hash(password, 10); // "10" = عدد "الجولات" (rounds) — كلما زاد، أبطأ وأصعب كسرًا
// ...
const isValid = await bcrypt.compare(inputPassword, hashedPassword); // لا "يفك تشفير" الهاش أبدًا — يُعيد حساب الهاش من كلمة المرور المدخَلة ويقارن الناتجين
```
**ملاحظة مهمة**: `bcrypt.compare` لا "يعكس" الهاش — يستحيل رياضيًا فعل ذلك. بدلاً من ذلك، يُطبِّق **نفس** خوارزمية الهاش على كلمة المرور المُدخَلة حديثًا، ويقارن الناتج بالهاش المخزَّن.

### JWT — ما هو ولماذا؟

**JWT** (JSON Web Token) هو نص واحد مُوقَّع رقميًا يحمل بيانات (عادة هوية المستخدم)، **بلا** أي حاجة للسيرفر أن يتذكّر شيئًا عنه (على عكس "الجلسات" التقليدية التي تُخزَّن في ذاكرة السيرفر أو قاعدة بيانات جانبية). أي طرف يملك السرّ الصحيح يستطيع **التحقق** من أن التوكن لم يُعبَث به — لكن لا أحد (غير من يملك السرّ) يستطيع **تزوير** توكن جديد صالح.

بنية JWT: 3 أجزاء مفصولة بنقاط: `header.payload.signature`. الجزء المهم لنا هو الـ **payload** — البيانات الفعلية المخزَّنة بداخله.

### JWT في مشروعنا — التفاصيل الكاملة

من `src/common/utils/types.ts`:
```ts
export type JwtPayload = {
  userId: string;
  userType: UserType;
};
```
هذا كل ما يحمله كل توكن — فقط `userId` و`userType`، **وليس** كلمة المرور أو أي بيانات حساسة أخرى (JWT قابل للفك والقراءة من أي شخص يحصل عليه، حتى لو لا يستطيع تزويره — لذلك لا تضع أسرارًا في الـ payload أبدًا).

### Access Token و Refresh Token — لماذا اثنان وليس واحدًا؟

مشكلة توكن واحد طويل الأمد: لو سُرق، يبقى صالحًا لمدة طويلة. مشكلة توكن واحد قصير الأمد: المستخدم يحتاج تسجيل الدخول كل بضع دقائق — تجربة استخدام سيئة جدًا. الحل الشائع: **توكنان**:

| | Access Token | Refresh Token |
|---|---|---|
| الغرض | يُرفَق مع **كل** طلب محمي | يُستخدَم **فقط** للحصول على access token جديد |
| المدة في مشروعنا | 15 دقيقة (900 ثانية) | 7 أيام (604800 ثانية) |
| السرّ المستخَدم | `JWT_ACCESS_SECRET` | `JWT_REFRESH_SECRET` (مختلف عمدًا) |
| أين يُخزَّن على السيرفر | لا يُخزَّن إطلاقًا (stateless بالكامل) | هاش bcrypt واحد في `users.hashedRefreshToken` |

من `AuthService.createTokens()`:
```ts
private async createTokens(payload: JwtPayload) {
  const accessToken = await this.jwtService.signAsync(payload, {
    secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
    expiresIn: 900,
  });
  const refreshToken = await this.jwtService.signAsync(payload, {
    secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    expiresIn: 604800,
  });
  return { accessToken, refreshToken };
}
```

**لماذا نخزّن هاش الـ refresh token في قاعدة البيانات (وليس الـ access token)؟** لأن الـ refresh token طويل الأمد نسبيًا وقوي (يُنشئ توكنات جديدة) — تخزين هاشه يسمح لنا بـ **إبطاله** لاحقًا (عند تسجيل الخروج، أو تغيير كلمة المرور) عبر مسحه من القاعدة. الـ access token قصير جدًا (15 دقيقة) لدرجة أن تكلفة تخزين/إبطال كل واحد منها لا تستحق العناء عمليًا — هذا **قرار تصميم صريح**، ويعني أن توكن الوصول يبقى صالحًا حتى انتهاء صلاحيته الطبيعية حتى بعد "تسجيل الخروج".

### تدفّق التسجيل (Registration) — كامل ومُشرَّح

```mermaid
flowchart TD
  A["POST /api/auth/register<br/>{firstName,lastName,email,password}"] --> B["RegisterDto validation"]
  B --> C["AuthService.register()"]
  C --> D{"هل البريد مسجَّل مسبقًا؟"}
  D -- نعم --> E["ConflictException('Email already registered') → 409"]
  D -- لا --> F["bcrypt.hash(password, 10)"]
  F --> G["crypto.randomBytes(32).toString('hex')<br/>توكن تحقق البريد"]
  G --> H["userRepository.save(newUser)<br/>isEmailVerified:false افتراضيًا"]
  H --> I["emailClient.emit('email.send', ترحيب)"]
  H --> J["emailClient.emit('email.send', رابط التحقق)"]
  J --> K["201 + بيانات مستخدم آمنة (بلا هاش كلمة المرور)"]
```

الكود الفعلي (من `auth.service.ts`):
```ts
async register(registerDto: RegisterDto) {
  const { firstName, lastName, email, password } = registerDto;
  const existingUser = await this.userRepository.findOne({ where: { email } });
  if (existingUser) throw new ConflictException('Email already registered');

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = crypto.randomBytes(32).toString('hex');

  const newUser = this.userRepository.create({
    firstName, lastName, email, password: hashedPassword, emailVerificationToken: verificationToken,
  });
  const savedUser = await this.userRepository.save(newUser);

  this.emailClient.emit('email.send', { to: savedUser.email, subject: 'Welcome to FTNS!', template: 'welcome', /* ... */ });
  const verificationLink = `${this.configService.get('APP_URL')}/auth/verify-email?token=${verificationToken}`;
  this.emailClient.emit('email.send', { to: savedUser.email, subject: 'Verify your email address', template: 'verify-email', context: { verificationLink } });

  return {
    message: 'User registered successfully',
    data: { user: { id: savedUser.id, firstName: savedUser.firstName, lastName: savedUser.lastName, email: savedUser.email, type: savedUser.type } },
  };
}
```
**لاحظ جيدًا**: كائن الرد النهائي يُبنى **يدويًا**، حقلاً بحقل — `password` ليست ضمن القائمة، لذلك `register()` لا يُسرِّب أي بيانات حساسة. هذا **يتناقض** مع `login()` (كما سنرى بعد قليل)، وهو تحديدًا سبب أن ثغرة تسريب الهاش (Part 27) لا تُصيب `register()`.

### تدفّق تسجيل الدخول (Login)

```ts
async login(loginDto: LoginDto) {
  const { email, password } = loginDto;
  const user = await this.userRepository.findOne({ where: { email } });
  if (!user) throw new UnauthorizedException('Invalid email or password');

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new UnauthorizedException('Invalid email or password');

  const tokens = await this.createTokens({ userId: user.id, userType: user.type });
  await this.updateRefreshToken(user.id, tokens.refreshToken);

  return { message: 'Login successful', data: { user, tokens } }; // ⚠️ user كاملاً — راجع Part 27
}
```

**تفصيل أمني مهم يستحق التوقف عنده**: الرسالة عند فشل التحقق هي **نفسها بالضبط** سواء كان البريد غير موجود أو كانت كلمة المرور خاطئة (`'Invalid email or password'`). هذا **مقصود** — لو كانت الرسالة تختلف ("البريد غير موجود" مقابل "كلمة مرور خاطئة")، لأصبح ممكنًا لمهاجم أن "يجرّب" عناوين بريد عشوائية ويكتشف أيها مسجَّل فعلاً في النظام (يُسمى هذا **User Enumeration**). لاحظ أن هذا الحرص **غير متّسق** في باقي المشروع — `register()` يكشف صراحة أن البريد مسجَّل مسبقًا (§27).

### التحقق من التوكن — `AuthGuard` بالتفصيل الكامل

هذا الكود يُنفَّذ عند **كل** طلب لمسار محمي. من `src/common/services/guards/auth/auth.guard.ts`:
```ts
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Please provide a valid Bearer token');
    }
    const token = authHeader.split(' ')[1];

    try {
      const payload = await this.jwtService.verifyAsync<{ userId: string }>(token, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      });
      const user = await this.userService.findById(payload.userId); // ← يُعيد تحميل المستخدم كاملاً من القاعدة!
      if (!user) throw new UnauthorizedException('User no longer exists');

      request.user = user;   // ← هذا ما يجعل req.user متاحًا في كل Controller لاحقًا
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
```

**سؤال مهم يجب أن تسأله نفسك دائمًا عند قراءة Guard كهذا**: لماذا يُعيد تحميل المستخدم كاملاً من قاعدة البيانات (`userService.findById`) بدل الاكتفاء بالـ `userId` من الـ payload مباشرة؟ **الإجابة**: التوكن نفسه صالح حتى لو حُذف المستخدم أو عُطِّل حسابه بعد إصدار التوكن (JWT لا "يعرف" شيئًا عن حالة القاعدة الحالية — إنه ملف موقَّع ثابت). إعادة التحميل من القاعدة **في كل طلب** يضمن أن حالة المستخدم الحالية (وليس وقت إصدار التوكن) هي ما يُستخدَم — **الكُلفة**: استعلام قاعدة بيانات إضافي على كل طلب محمي.

### تجديد التوكن (Refresh)

```ts
async refreshTokens(refreshToken: string) {
  try {
    const payload = await this.jwtService.verifyAsync<JwtPayload>(refreshToken, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    });
    const user = await this.userRepository.findOne({ where: { id: payload.userId } });
    if (!user || !user.hashedRefreshToken) throw new UnauthorizedException('Access Denied');

    const refreshTokenMatches = await bcrypt.compare(refreshToken, user.hashedRefreshToken);
    if (!refreshTokenMatches) throw new UnauthorizedException('Invalid refresh token');

    const tokens = await this.createTokens({ userId: user.id, userType: user.type });
    await this.updateRefreshToken(user.id, tokens.refreshToken); // ← دوران: القديم يُستبدَل بجديد
    return { message: 'Tokens refreshed successfully', data: { tokens } };
  } catch {
    throw new UnauthorizedException('Invalid or expired refresh token');
  }
}
```
لماذا `bcrypt.compare(refreshToken, user.hashedRefreshToken)` بدلاً من الاكتفاء بتحقق JWT فقط؟ لأن هذا يسمح بـ **إبطال** refresh token معيّن (بمسح الهاش) دون انتظار انتهاء صلاحيته الطبيعية (7 أيام) — وهو بالضبط ما يحدث عند `logout()`.

### Current User — كيف نصل لهوية المستخدم داخل أي Controller

بعد أن يضع `AuthGuard` الكائن الكامل في `request.user`، هناك طريقتان للوصول له:

```ts
// الطريقة 1: عبر @Req()/@Request() القياسي
async getProfile(@Request() req: UserReq) {
  return await this.usersService.getProfile(req.user.id);
}

// الطريقة 2: عبر Custom Decorator (سنشرح آلية بنائه في Part 16)
async sendMessage(@User() user: UserEntity) { /* ... */ }
async deleteSession(@User('id') userId: string) { /* ... */ } // يقرأ حقلاً واحدًا فقط
```

### Cookies و Headers — أيهما يستخدم هذا المشروع؟

**Headers فقط، لا Cookies إطلاقًا.** العميل مسؤول عن تخزين التوكنين (في التخزين المحلي للتطبيق) وإرفاق الـ access token يدويًا في كل طلب عبر `Authorization: Bearer <token>`. هذا اختيار شائع جدًا لِـ APIs تخدم تطبيقات موبايل (حيث Cookies أقل ملاءمة من الويب).

### ماذا لا يوجد في هذا المشروع (كي لا تتوقع شيئًا غير موجود)

- لا Cookies، لا Sessions تقليدية.
- لا OAuth (تسجيل دخول عبر Google/Facebook).
- لا Two-Factor Authentication (2FA) حقيقي (الـ OTP هنا فقط لاسترجاع كلمة المرور/تغيير البريد، ليس كخطوة دخول إضافية).
- لا قائمة إبطال (blacklist) لتوكنات الوصول.

---

# PART 15 — Authorization

### Authentication مقابل Authorization — التذكير العملي

راجعنا الفرق نظريًا في Part 1. عمليًا في هذا المشروع:

```mermaid
flowchart LR
  A[Request] --> B["Authentication (AuthGuard)<br/>من أنت؟"]
  B -- "توكن صالح" --> C["User Identity<br/>request.user = UserEntity كامل"]
  B -- "توكن غير صالح" --> R1[401 Unauthorized]
  C --> D["Authorization (RolesGuard)<br/>هل تملك الدور المطلوب؟"]
  D -- نعم --> E[Allowed → ينفَّذ الـ Handler]
  D -- لا --> R2[403 Forbidden]
```

### Roles في هذا المشروع — بسيط ومباشر

لا يوجد نظام Permissions دقيق (لا "صلاحية حذف تمرين" منفصلة عن "صلاحية تعديله") ولا RBAC معقّد بأدوار متعددة قابلة للتركيب. يوجد **دور واحد فقط لكل حساب**:
```ts
export enum UserType {
  ADMIN = 'admin',
  USER = 'user',
}
```
هذا كل ما يحتاجه المشروع فعليًا — تمييز بسيط بين "مستخدم عادي يستهلك المحتوى" و"مدير يُنشئ/يُعدّل المحتوى".

### `@Roles()` — Custom Decorator لوضع Metadata

من `src/common/decorators/roles.decorator.ts`:
```ts
export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
```
`SetMetadata` (من `@nestjs/core`) **لا تفعل شيئًا وقت التشغيل بنفسها** — فقط "تلصق" معلومة (`{roles: ['admin']}`) على الدالة/الكلاس، **يقرؤها لاحقًا** كائن آخر (هنا: `RolesGuard`) عبر `Reflector`. هذا نمط شائع جدًا في NestJS: **Decorator يضع البيانات، Guard/Interceptor يقرأها وينفّذ القرار**.

### RBAC المبسَّط هنا

المشروع لا يستخدم مصطلح "RBAC" الكامل (Role-Based Access Control بمعناه الكامل مع صلاحيات متعددة قابلة للتركيب لكل دور) — لكنه يطبّق **نسخة مبسَّطة منه**: كل مسار يُعلِن صراحة "أي الأدوار مسموح لها"، والـ Guard يقارن دور المستخدم الحالي بهذه القائمة.

### Policies — هل موجودة؟

**لا.** لا يوجد محرك Policies منفصل (مثل CASL أو نظام قواعد ديناميكي). كل قرار تفويض إما: (أ) صريح عبر `@Roles()`، أو (ب) ضمني داخل الـ Service نفسه (مثل التحقق أن مستخدمًا يملك جلسة الدردشة التي يحاول حذفها — هذا "تفويض على مستوى البيانات"، وليس على مستوى الدور، ويعيش داخل الـ Service وليس Guard).

مثال على تفويض على مستوى البيانات، من `AiChatService.deleteSession()`:
```ts
async deleteSession(sessionId: string, userId: string) {
  const session = await this.chatSessionRepository.findOne({
    where: { id: sessionId, user: { id: userId } },  // ← الشرط المزدوج هو "التفويض" هنا
  });
  if (!session) throw new NotFoundException('Session not found or you do not have permission');
  // ...
}
```
لاحظ: الرسالة **عمدًا** غامضة ("غير موجودة أو لا تملك صلاحية") — لا تكشف أيهما الحقيقي، لنفس منطق منع الـ Enumeration الذي رأيناه في Part 14.

---

# PART 16 — Guards

### ما هو Guard؟

كلاس `@Injectable()` ينفّذ **قرارًا واحدًا فقط**: هل يُسمح بمتابعة هذا الطلب أم لا؟ يُنفَّذ **قبل** أي Pipe أو Controller Handler (راجع Part 5).

### لماذا Guard وليس مجرد `if` داخل الـ Controller؟

يمكن نظريًا كتابة `if (!isAuthenticated) throw ...` في بداية كل دالة Controller — لكن هذا يعني تكرار نفس المنطق في عشرات الأماكن، وسهولة نسيانه في مسار جديد. Guard يُعرَّف **مرة واحدة**، ويُطبَّق تصريحيًا (`@UseGuards(...)`) — أوضح، أقل عرضة للخطأ، وقابل لإعادة الاستخدام.

### متى يعمل؟ كيف يعمل؟ — `CanActivate` و`ExecutionContext`

كل Guard يُنفِّذ واجهة `CanActivate`، وله دالة واحدة إلزامية: `canActivate(context: ExecutionContext)`. يجب أن تُعيد (أو `Promise` تُعيد) إما:
- `true` → الطلب يتابع لباقي السلسلة.
- `false` → NestJS يرمي `ForbiddenException` تلقائيًا.
- أو ترمي استثناءً بنفسك (الأشيع في هذا المشروع) للتحكم في الرسالة/الكود بدقة.

`ExecutionContext` هو الكائن الذي يمنحك "الوصول" لتفاصيل الطلب الحالي، بغض النظر عن نوع التطبيق (HTTP، RPC، WebSocket) — في مشروعنا (HTTP فقط)، نستخرج منه دائمًا الطلب عبر:
```ts
const request = context.switchToHttp().getRequest();
```

### الحراس الثلاثة في هذا المشروع

| Guard | الملف | القرار |
|---|---|---|
| `AuthGuard` | `src/common/services/guards/auth/auth.guard.ts` | هل التوكن صالح؟ (Authentication) — شُرح كاملاً في Part 14 |
| `RolesGuard` | `src/common/services/guards/auth/roles.guard.ts` | هل دور المستخدم مطابق للمطلوب؟ (Authorization) — شُرح في Part 15 |
| `ThrottlerGuard` | من مكتبة `@nestjs/throttler` (ليس مكتوبًا في المشروع) | هل تجاوز المستخدم/الـ IP عدد الطلبات المسموح؟ |

### `RolesGuard` كاملاً، مُشرَّحًا سطرًا سطرًا

```ts
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}   // ← الأداة التي تقرأ الـ metadata التي وضعها @Roles()

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),  // الدالة نفسها (مستوى method)
      context.getClass(),    // الكلاس (مستوى class)
    ]);
    if (!requiredRoles) {
      return true;           // ← لا @Roles على هذا المسار إطلاقًا = مسموح لأي مستخدم مصادَق
    }
    const { user } = context.switchToHttp().getRequest();
    const hasRole = requiredRoles.includes(user?.type);
    if (!hasRole) {
      throw new ForbiddenException(`Access Denied: You do not have the required permissions (${requiredRoles.join(', ')})`);
    }
    return true;
  }
}
```

**لماذا `getAllAndOverride` وليس `get` فقط؟** لأن `@Roles()` قد توضع على مستوى **الدالة** أو **الكلاس** (أو كليهما). `getAllAndOverride` يبحث في القائمة المُمرَّرة **بالترتيب** ويأخذ **أول** قيمة موجودة — أي أن `@Roles()` على مستوى الدالة (إن وُجدت) **تتغلّب** على أي شيء معرَّف على مستوى الكلاس. في هذا المشروع، لا يوجد `@Roles()` على مستوى الكلاس في أي Controller — دائمًا على مستوى الدالة فقط، لكن فهم هذا السلوك مهم لأي مشروع NestJS آخر تقرؤه لاحقًا.

### `Request Access` — كيف يصل Guard لبيانات الطلب

كلا الـ Guards هنا يصلان للطلب بنفس الطريقة: `context.switchToHttp().getRequest()`. `AuthGuard` **يكتب** إليه (`request.user = user`)، و`RolesGuard` **يقرأ منه** (`const {user} = ...getRequest()`) — وهذا **بالضبط** لماذا **الترتيب** في `@UseGuards(AuthGuard, RolesGuard)` حرج: NestJS ينفّذ الحراس بترتيب المصفوفة، فلو عكسنا الترتيب، سيحاول `RolesGuard` قراءة `request.user` **قبل** أن يضعه `AuthGuard` هناك — `user` سيكون `undefined`، وستفشل كل عملية تفويض دون سبب واضح.

### مثال حقيقي على ثغرة ناتجة عن نسيان ربط Guard

هذا **درس عملي حقيقي جدًا** من هذا المشروع نفسه (مذكور في `PROJECT_ANALYSIS.md` §18): `AiChatController` يطبّق:
```ts
@UseGuards(AuthGuard)   // ← RolesGuard غائب هنا!
@Controller('ai-chat')
export class AiChatController {
  @Roles(UserType.USER)  // ← هذا الديكوريتور "يضع علامة" فقط — لا أحد يقرأها!
  @Post()
  async sendMessage(...) { ... }
}
```
بما أن `RolesGuard` هو **الوحيد** الذي يقرأ metadata الـ `@Roles`، وهو غائب هنا تمامًا من `@UseGuards`، فإن `@Roles(UserType.USER)` **معطَّلة فعليًا** — أي مستخدم مُصادَق (بما فيهم `ADMIN`) يستطيع استخدام مسارات الدردشة، رغم أن نية الكود الظاهرة تقييدها بـ `USER` فقط.

**الدرس الذي يجب أن تحفظه**: **Decorator بلا Guard يقرأه = لا تأثير وظيفي إطلاقًا**، مهما بدا واضحًا في الكود. هذا فخ سهل جدًا الوقوع فيه — تحقق دائمًا من قائمة `@UseGuards()` الفعلية، لا تثق بوجود `@Roles()` وحدها.

### `ThrottlerGuard` — استخدام يدوي جزئي فقط

المشروع يسجّل إعدادات Throttler عالميًا في `app.module.ts`:
```ts
ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]) // 10 طلبات كل 60 ثانية
```
لكن هذا **التسجيل وحده لا يفعل شيئًا** — هو فقط يهيّئ **إعدادات** متاحة، تمامًا كما أن `@Roles()` وحدها لا تفعل شيئًا بلا `RolesGuard`. التفعيل الفعلي يحتاج ربط `ThrottlerGuard` إما عالميًا (`APP_GUARD` provider) أو يدويًا على كل مسار. في هذا المشروع، الربط اليدوي حدث في **مكان واحد فقط**:
```ts
// ai-chat.controller.ts
@UseGuards(ThrottlerGuard)
@Post()
async sendMessage(...) { ... }
```
نتيجة ذلك: **كل** مسارات المصادقة (`login`, `register`, `forgot-password`، إلخ) **بلا أي حماية من محاولات التخمين الآلي** — رغم أن الإعدادات مسجَّلة عالميًا وتوحي بخلاف ذلك (تفصيل كامل، ولماذا هذا خطير، في [Part 27](#part-27--security)).

---

# PART 17 — Pipes

### ما هو Pipe؟

كلاس (أو دالة factory) ينفّذ واحدًا من دورين على **قيمة داخلة واحدة** (معامل واحد في الـ Handler): **التحويل (Transformation)** أو **التحقق (Validation)** — غالبًا كليهما معًا. يعمل **بعد** الحراس، **قبل** وصول القيمة فعليًا لدالة الـ Controller (راجع مخطط Part 5).

### `ValidationPipe` — الأهم في هذا المشروع

شرحناه بعمق في [Part 10](#part-10--dtos--validation). ملخص الدور هنا: يأخذ الجسم/الـ query الخام، يبنيه ككائن من كلاس الـ DTO، يُشغِّل كل قواعد `class-validator` عليه، ويُعيد إما النسخة النظيفة المحوَّلة أو يرمي `BadRequestException` (400) بقائمة الأخطاء.

### Pipes مدمجة أخرى مستخدَمة في المشروع

| Pipe | الغرض | مثال من المشروع |
|---|---|---|
| `ParseIntPipe` | يحوّل route parameter نصي إلى رقم صحيح، يرفض إن لم يكن كذلك | `@Param('id', ParseIntPipe) id: number` |
| `ParseUUIDPipe` | يتحقق أن route parameter نص UUID صالح | `@Param('id', ParseUUIDPipe) id: string` |

مثال حقيقي من `category.controller.ts`:
```ts
@Delete(':id')
async remove(@Param('id', ParseIntPipe) id: number) {
  return await this.categoryService.remove(id);
}
```
بلا `ParseIntPipe`، كان `id` سيصل كنص (`"42"`) دائمًا (كل route parameters نصوص أصلاً في HTTP) — `ParseIntPipe` يحوّله لرقم فعلي **ويرفض الطلب بـ 400** إن أرسل العميل شيئًا مثل `/category/abc` غير قابل للتحويل لرقم، **قبل** أن تصل القيمة الفاسدة لأي كود عمل.

### Custom Pipe في هذا المشروع — `createImageValidation`

هذا ليس كلاس `PipeTransform` مخصَّص كامل، بل **دالة factory** تبني Pipe جاهزًا من `@nestjs/common` بإعدادات محدَّدة. من `src/common/pipes/file-validation.pipe.ts`:
```ts
export const createImageValidation = ({ required = true }: { required?: boolean }) =>
  new ParseFilePipeBuilder()
    .addFileTypeValidator({ fileType: /(jpeg|png|webp|gif)/ })
    .addMaxSizeValidator({ maxSize: 5 * 1024 * 1024 })  // 5 ميجابايت
    .build({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      fileIsRequired: required,
    });
```
`ParseFilePipeBuilder` هو أداة جاهزة من NestJS نفسه لبناء Pipes تحقق ملفات دون كتابة كلاس كامل من الصفر. استخدامه في `onboarding.controller.ts`:
```ts
async create(
  @Body() dto: CreateOnboardingDto,
  @UploadedFile(createImageValidation({})) file: Express.Multer.File,  // required=true افتراضيًا
) { ... }

async update(
  @Param('id', ParseUUIDPipe) id: string,
  @Body() dto: UpdateOnboardingDto,
  @UploadedFile(createImageValidation({ required: false })) file?: Express.Multer.File,  // اختياري عند التعديل
) { ... }
```
**لاحظ الفرق العملي**: عند الإنشاء، الصورة **إلزامية**؛ عند التعديل، **اختيارية** (قد لا يريد الأدمن تغيير الصورة). نفس الدالة، خيار مختلف — هذا بالضبط سبب كتابتها كـ *factory* قابلة للتهيئة بدل Pipe ثابت واحد.

### ثغرة حقيقية بسبب **غياب** Pipe مماثل — درس عملي

`WorkoutController` (رفع فيديو التمرين) **لا يستخدم** أي Pipe تحقق مكافئ:
```ts
@UseInterceptors(FileInterceptor('video'))
async create(
  @Body() createWorkoutDto: CreateWorkoutDto,
  @UploadedFile() video?: Express.Multer.File,   // ← بلا أي Pipe! لا نوع، لا حجم أقصى
) { ... }
```
النتيجة: يمكن رفع ملف بأي نوع وأي حجم تقريبًا (يعتمد فقط على حدود الخادم الافتراضية، غير المضبوطة هنا صراحة) — احتمال استنزاف موارد حقيقي (تفصيل كامل في [Part 27](#part-27--security)). **الدرس**: Pipes ليست "تفصيلاً تقنيًا" — غيابها ثغرة أمنية حقيقية.

---

# PART 18 — Interceptors

### ما هو Interceptor؟

كلاس ينفّذ واجهة `NestInterceptor`، وله قدرة **فريدة** لا تملكها Guards أو Pipes: التنفيذ **قبل وبعد** الـ Handler في **نفس** الدالة، بفضل نمط RxJS (`Observable`). هذا يجعله مثاليًا لأي شيء يحتاج "لف" (wrap) حول تنفيذ الدالة: توقيت، تسجيل، تحويل الاستجابة، تخزين مؤقت (caching)، إلخ.

### لماذا نحتاجه؟ متى نستخدمه بدل Guard أو Pipe؟

- **Guard**: قرار ثنائي (يسمح/يرفض) **قبل** الوصول للـ Handler، لا يلمس النتيجة.
- **Pipe**: يحوّل/يتحقق من **معامل واحد داخل**، لا علاقة له بما يخرج.
- **Interceptor**: الوحيد القادر على رؤية **وتعديل** ما يخرج من الـ Handler (الاستجابة)، أو قياس **كم استغرق تنفيذه**، لأنه "يغلّف" التنفيذ بأكمله.

### الشكل العام لأي Interceptor

```ts
intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
  // كود "قبل" هنا
  return next.handle().pipe(
    map((data) => {
      // كود "بعد" هنا — data هو ما أعادته دالة الـ Controller
      return transformedData;
    }),
  );
}
```
`next.handle()` هو استدعاء **باقي السلسلة** (بقية الـ Interceptors، ثم الـ Handler نفسه) — يُعيد `Observable`. استدعاء `.pipe(map(...))` عليه هو ما يسمح بتعديل النتيجة **بعد** أن تعود.

### `TransformInterceptor` في هذا المشروع — مكتوب لكن غير مُفعَّل

من `src/common/interceptors/transform.interceptor.ts`، الكود **كاملاً**:
```ts
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    const message = this.reflector.get<string>('responseMessage', context.getHandler()) ?? 'Success';

    return next.handle().pipe(
      map((data: T) => ({
        success: true,
        message,
        data,
      })),
    );
  }
}
```
**الفكرة جيدة ومكتوبة بشكل صحيح تمامًا**: يأخذ أي شيء يُعيده أي Controller Handler في المشروع، ويغلّفه تلقائيًا بـ `{success:true, message, data}` — نفس شكل الأخطاء الموحَّد من `AllExceptionsFilter` (Part 20)، مما يجعل **كل** استجابة (ناجحة أو فاشلة) بنفس البنية العامة، وهو نمط جيد جدًا ومتّبع في مشاريع NestJS كثيرة.

**المشكلة**: هذا الكلاس **غير مربوط في أي مكان** — لا `app.useGlobalInterceptors(new TransformInterceptor(...))` في `main.ts`، لا تسجيل كـ `APP_INTERCEPTOR` provider، لا `@UseInterceptors(TransformInterceptor)` على أي Controller. **كود ميت بالكامل وقت التشغيل**، رغم أنه مكتوب ومُختبَر ذهنيًا بشكل صحيح.

### كيف كنّا سنُفعِّله؟ (تمرين فهم، ليس تطبيقًا مطلوبًا الآن)

الطريقة القياسية لتفعيله **عالميًا** كانت ستكون واحدة من طريقتين:
```ts
// الطريقة 1 — في main.ts
app.useGlobalInterceptors(new TransformInterceptor(app.get(Reflector)));

// الطريقة 2 — كـ Provider داخل AppModule (الطريقة المفضَّلة لأنها تدعم DI كاملاً)
providers: [{ provide: APP_INTERCEPTOR, useClass: TransformInterceptor }]
```

### دليل حقيقي على أنه **كان** مُفعَّلاً في وقت ما

من `PROJECT_ANALYSIS.md`: يوجد سكربت CLI منفصل تمامًا عن التطبيق، `src/common/utils/ai-client.js`، يقرأ استجابة تسجيل الدخول هكذا:
```js
const authResponse = await axios.post(LOGIN_URL, { email, password });
AUTH_TOKEN = authResponse.data.data.data.tokens.accessToken;  // ← ثلاث ".data" متتالية!
```
لماذا 3 مستويات `.data`؟ لأن `AuthService.login()` يُعيد أصلاً `{message, data:{user,tokens}}` (مستوى تعشيش واحد). لو كان `TransformInterceptor` يعمل، كان سيُضيف مستوى تعشيش **ثانٍ** فوق ذلك: `{success, message, data: {message, data:{user,tokens}}}`. عندها: `response.data` (رد axios) = الكل، `.data` = `{message,data:{user,tokens}}`، `.data` = `{user,tokens}`، `.tokens.accessToken` — **بالضبط 3 مستويات، بالضبط ما يقرأه السكربت**. بدون الـ Interceptor فعليًا الآن، هذا السكربت **يفشل** — دليل قوي جدًا وملموس أن هذا الـ Interceptor عمل يومًا ما ثم أُزيل تفعيله (أو لم يُستكمل ربطه) دون تحديث السكربت.

**الدرس الأهم من هذا القسم بالكامل**: كتابة كود جيد ليست كافية — **الربط (wiring)** جزء لا يقل أهمية، ونسيانه لا يظهر كخطأ Compile-time، بل يظهر لاحقًا كسلوك غير متوقَّع في مكان بعيد تمامًا (هنا: سكربت اختبار يدوي يفشل بصمت).

---

# PART 19 — Middleware

### ما هو Middleware؟

دالة (أو كلاس) تُنفَّذ **قبل كل شيء آخر** في دورة حياة الطلب — حتى قبل تحديد أي Route أو Guard. في Express (الذي يعمل تحت NestJS)، هذا هو المفهوم الأساسي والوحيد أصلاً؛ NestJS يبنيه كطبقة أولى من طبقاته الخاصة.

### لماذا نحتاجه؟

لأي معالجة **عامة جدًا** لا علاقة لها بمنطق مسار معيّن ولا بقرار "سماح/رفض" — مثل: تسجيل كل طلب وارد (logging)، ضغط الاستجابة (compression)، تحليل الكوكيز، إضافة هيدرز أمان عامة (مثل Helmet).

### الفرق بين Middleware وGuard وInterceptor — الجدول الحاسم

| | Middleware | Guard | Interceptor |
|---|---|---|---|
| **متى يعمل؟** | أول شيء، قبل حتى تحديد أي Route | بعد تحديد الـ Route، قبل Pipes | بعد Guards، يغلّف التنفيذ بأكمله |
| **يعرف أي Controller/Handler سيُستدعى؟** | لا (لا يملك `ExecutionContext`) | نعم | نعم |
| **يستطيع منع الوصول للـ Handler؟** | نعم (بعدم استدعاء `next()`) لكن بطريقة يدوية بحتة | نعم، هذا **دوره الوحيد** | لا يمنع، لكن يستطيع تعديل ما يخرج |
| **يستطيع تعديل الاستجابة الخارجة؟** | لا (فقط يعدّل الطلب الداخل) | لا | نعم، هذا **أحد أدواره الأساسية** |
| **يصل لسياق Nest الكامل (DI، Reflector metadata)؟** | وصول محدود | وصول كامل | وصول كامل |

### هل يوجد Middleware في هذا المشروع؟

**لا، إطلاقًا.** بحث كامل في المشروع لم يجد أي كلاس ينفّذ `NestMiddleware`، ولا أي استدعاء لـ `configure(consumer: MiddlewareConsumer)` داخل أي موديول. هذا **قرار (ضمني) صحيح تمامًا** لحجم هذا المشروع: كل ما يحتاجه المشروع من "معالجة عامة" مُغطّى فعليًا عبر:
- `ValidationPipe` العام (بدل middleware تحقق يدوي).
- `AuthGuard`/`RolesGuard` (بدل middleware مصادقة يدوي).
- `AllExceptionsFilter` (بدل middleware معالجة أخطاء يدوي).

**متى كنا سنحتاج Middleware فعلاً في مشروع كهذا؟** لو أردنا مثلاً: تسجيل (logging) **كل** طلب وارد بغض النظر عن نجاحه أو فشله لاحقًا (حتى قبل معرفة أي Controller سيُستدعى)، أو تعديل الطلب الخام نفسه (مثل فك ضغط جسم الطلب) قبل وصوله لأي طبقة أخرى.

---

# PART 20 — Exception Handling

### Errors مقابل Exceptions

- **Error**: أي حالة غير متوقَّعة في تنفيذ الكود (مفهوم JavaScript/Node عام).
- **Exception**: في سياق NestJS، غالبًا تعني تحديدًا **رمي** (`throw`) كائن خطأ يتوقّعه إطار العمل ليعرف كيف يترجمه لاستجابة HTTP مناسبة.

### `HttpException` — أساس كل استثناءات NestJS

كلاس أساسي يحمل **رسالة** و**status code**. NestJS يوفر كلاسات جاهزة ترث منه لكل حالة شائعة — **كل** استثناء تراه في هذا المشروع هو أحدها:

| الكلاس | Status Code | مثال استخدام حقيقي من المشروع |
|---|---|---|
| `BadRequestException` | 400 | `'Old password is incorrect'` |
| `UnauthorizedException` | 401 | `'Invalid email or password'` |
| `ForbiddenException` | 403 | `'Access Denied: You do not have the required permissions'` |
| `NotFoundException` | 404 | `'Workout with ID 42 not found'` |
| `ConflictException` | 409 | `'Email already registered'` |

مثال من الكود، `UsersService.changePassword`:
```ts
if (!isPasswordMatched) {
  throw new BadRequestException('Old password is incorrect');
}
```
مجرد `throw` — لا `try/catch` هنا، ولا حاجة لأي معالجة يدوية. NestJS **يلتقط** كل استثناء يُرمى في أي مكان داخل دورة حياة الطلب (Guard، Pipe، Controller، Service) تلقائيًا.

### Exception Filters — من يلتقط هذه الاستثناءات فعليًا؟

كلاس ينفّذ `ExceptionFilter`، ويُحدَّد بـ `@Catch(...)` أي نوع استثناءات يعالجها (`@Catch()` بلا معاملات = **كل شيء**). هذا هو **آخر** محطة يمر بها أي خطأ قبل الخروج للعميل كاستجابة HTTP.

### `AllExceptionsFilter` — كاملاً، مُشرَّحًا

من `src/common/all-exceptions.filter.ts`:
```ts
@Catch()   // ← يلتقط كل شيء: HttpException، وأي Error عادي، وأي شيء آخر يُرمى
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;  // افتراضي: 500
    let message = 'Internal server error';
    let stack: string | undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object') {
        const res = exceptionResponse as Record<string, unknown>;
        if (Array.isArray(res.message)) {
          message = res.message.join(', ');   // ← رسائل class-validator المتعددة، مُجمَّعة
        } else if (typeof res.message === 'string') {
          message = res.message;
        }
      }
      stack = exception.stack;
    } else if (exception instanceof Error) {
      message = exception.message;
      stack = exception.stack;
    }

    // تسجيل حسب الخطورة
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(JSON.stringify({ /* ... */ }), stack);
    } else if (status >= HttpStatus.BAD_REQUEST) {
      this.logger.warn(JSON.stringify({ /* ... */ }));
    }

    response.status(status).json({
      success: false,
      message,
      data: null,
      ...(process.env.NODE_ENV !== 'production' && { timestamp: /* ... */ }),
    });
  }
}
```

**التقسيم المنطقي للدالة**:
```text
1) هل هذا HttpException (استثناء NestJS قياسي)؟
       ↓ نعم → استخرج status الحقيقي + الرسالة (بما فيها مصفوفات رسائل class-validator)
       ↓ لا  → هل Error عادي؟ استخدم رسالته، لكن status يبقى 500 دائمًا
2) سجّل الخطأ (error لِـ 500، warn لِما دون ذلك)
3) أعد استجابة بشكل موحّد دائمًا: {success:false, message, data:null}
```

### لماذا `@Catch()` بلا نوع محدَّد، وليس `@Catch(HttpException)` فقط؟

لو اقتصر على `HttpException` فقط، فإن أي خطأ **غير متوقَّع** (bug حقيقي في الكود، خطأ اتصال بقاعدة البيانات، إلخ — وهي ليست `HttpException` بل `Error` عادي) كان سيهرب من هذا الـ Filter تمامًا، ويصل للعميل كـ HTML خام لصفحة خطأ Express الافتراضية (تسريب تفاصيل داخلية خطير)، أو يُسقط الاتصال بلا استجابة منظَّمة إطلاقًا. `@Catch()` العام يضمن: **مهما حدث، سيصل للعميل دائمًا JSON منظَّم** بنفس الشكل.

### Validation Errors — كيف تصل هنا فعليًا

عندما يفشل `ValidationPipe` (Part 10/17)، فهو أصلاً يرمي `BadRequestException` **يحتوي مصفوفة رسائل** (رسالة واحدة لكل قاعدة فشلت). هذا بالضبط سبب وجود السطر:
```ts
if (Array.isArray(res.message)) {
  message = res.message.join(', ');
}
```
مثال: لو أرسل عميل كلمة مرور قصيرة جدًا **وبلا** حرف كبير، سيصل هنا `message: ['Password must be at least 8 characters long', 'Password must contain uppercase, lowercase, number and special character']`، ويُجمَّع في رسالة واحدة مفصولة بفواصل.

### Database Errors — كيف تُعالَج؟

**لا معالجة خاصة**. أي خطأ من TypeORM/PostgreSQL (مثل انتهاك قيد `unique` لم يُتحقَّق منه مسبقًا في الـ Service) هو `Error` عادي (وليس `HttpException`)، فيسقط في الفرع الثاني من الشرط أعلاه → **دائمًا 500**، برسالة الخطأ الخام من قاعدة البيانات (خارج الإنتاج فقط تُسجَّل التفاصيل الكاملة؛ الرسالة نفسها **قد** تحمل تفاصيل تقنية من PostgreSQL إن لم تُعالَج القاعدة مسبقًا بتحقق `Service`-level صريح — لهذا يتحقق كل Service في المشروع يدويًا من التفرّد **قبل** الحفظ (`categoryExist`, `nameExist`، إلخ) بدل الاعتماد على القاعدة لترمي الخطأ).

### External API Errors — كيف تُعالَج؟

كل تكامل خارجي في هذا المشروع (Cloudinary، Gemini) يلفّ استدعاءه الخاص بـ `try/catch` **محليًا** داخل الـ Service، ويحوّله لاستثناء NestJS واضح **قبل** أن يصل لـ `AllExceptionsFilter` كـ 500 غامض. مثال من `AiChatService`:
```ts
} catch (error: unknown) {
  this.logger.error(`Failed to process AI chat for user ${user.id}...`, /* ... */);
  throw new BadRequestException('Failed to get response from AI');  // ← تحويل خطأ تقني غامض لرسالة واضحة للعميل
}
```
**الدرس المهم هنا**: `AllExceptionsFilter` هو **خط الدفاع الأخير**، وليس المكان الذي يجب أن "تُترجَم" فيه كل الأخطاء الخارجية — كل Service مسؤول عن ترجمة أخطائه الخاصة (Cloudinary فشل → `BadRequestException` بمعنى واضح للعميل) **قبل** أن تصل هناك.

### Global Handling — الخلاصة البصرية

```mermaid
flowchart TD
  A["أي خطأ في أي مكان:<br/>Guard / Pipe / Controller / Service"] --> B{"HttpException؟"}
  B -- نعم --> C["استخرج status + message الحقيقيَين"]
  B -- لا (Error عادي/غير متوقَّع) --> D["status=500، message=error.message"]
  C --> E["AllExceptionsFilter"]
  D --> E
  E --> F["سجّل (error أو warn حسب الخطورة)"]
  F --> G["استجابة موحّدة دائمًا:<br/>{success:false, message, data:null}"]
```

---

# PART 21 — Configuration

### Environment Variables — لماذا لا نكتب القيم مباشرة في الكود؟

راجعنا هذا في Part 3. التذكير المهم هنا: أي قيمة **تختلف** بين بيئة وأخرى (تطوير/إنتاج) أو **حسّاسة** (كلمة سر قاعدة بيانات، سرّ JWT، مفتاح API) يجب أن تأتي من متغيرات البيئة، **أبدًا** مكتوبة داخل ملفات `.ts` نفسها.

### `ConfigModule` — كيف يجعل NestJS متغيرات البيئة متاحة

من `app.module.ts`:
```ts
ConfigModule.forRoot({ isGlobal: true }),
```
`ConfigModule` (من `@nestjs/config`) يقرأ ملف `.env` تلقائيًا عند الإقلاع، ويجعل كل قيمة متاحة عبر `ConfigService`. `isGlobal: true` يعني: **لا حاجة لاستيراد `ConfigModule` صراحة في كل موديول فرعي** يريد استخدام `ConfigService` — يكفي حقنه في الـ constructor مباشرة، من أي مكان في المشروع.

### `ConfigService` — كيف نقرأ قيمة فعليًا

```ts
private readonly configService: ConfigService

// ...
this.configService.get<string>('JWT_ACCESS_SECRET')
this.configService.get<number>('PORT')
```
`get<T>(key)` عام (Generic — راجع Part 2) يسمح بتحديد النوع المتوقَّع للقيمة (كل متغيرات البيئة أصلاً نصوص، لكن `get<number>` يخبر TypeScript كيف نتعامل معها في الكود، دون تحويل فعلي تلقائي في هذا الاستخدام البسيط).

### كل مجموعات الإعداد في هذا المشروع

| المجموعة | المتغيرات | تُستهلك في |
|---|---|---|
| الخادم | `PORT`, `NODE_ENV` | `main.ts` |
| القاعدة | `DATABASE_HOST/PORT/USER/PASSWORD/NAME` | `app.module.ts` |
| JWT | `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET` | `AuthService`, `AuthGuard` |
| Cloudinary | `CLOUDINARY_CLOUD_NAME/API_KEY/API_SECRET` | `CloudinaryService` |
| RabbitMQ | `RABBITMQ_URL` | `main.ts`, `AuthModule` |
| SMTP | `SMTP_HOST/PORT/USER/PASS/FROM` | `MailService` |
| AI | `GOOGLE_API_KEY` | `AiModule` |
| عام | `APP_URL` | `AuthService.register` (بناء رابط تحقق البريد) |

### Configuration مرتبطة بمنطق فعلي — ليست مجرد قراءة قيم

مثال جيد على أن الإعداد قد يقود **قرارًا برمجيًا حقيقيًا**، من `app.module.ts`:
```ts
TypeOrmModule.forRootAsync({
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    // ...
    synchronize: configService.get<string>('NODE_ENV') === 'development',
  }),
  inject: [ConfigService],
}),
```
قيمة `NODE_ENV` **تُقرر مباشرة** سلوكًا حرجًا (هل نسمح لـ TypeORM بتعديل هيكل الجداول تلقائيًا أم لا؟ راجع Part 12). هذا نمط مهم: الإعداد ليس دائمًا "رقم منفذ" بسيطًا — أحيانًا يتحكم في **سلوك بنيوي** كامل للتطبيق.

### Secrets — كيف تُدار هنا (وما الذي ينقص)

كل الأسرار (JWT، قاعدة البيانات، Cloudinary، SMTP، Google API) موجودة فقط في `.env` (غير مرفوع لـ Git — موجود في `.gitignore`)، وملف `.env.example` يوثّق **الأسماء المطلوبة فقط**، بقيم placeholder واضحة (`CHANGE_THIS_...`). هذا نمط قياسي وجيد.

**ما ينقص**: لا يوجد **تحقق شكل (schema validation)** على متغيرات البيئة عند الإقلاع (لا استخدام لـ `Joi` أو ما شابه مع `ConfigModule.forRoot({validationSchema: ...})`). النتيجة العملية: لو نسي أحدهم تعيين `JWT_ACCESS_SECRET` في بيئة معيّنة، **لن يفشل التطبيق عند الإقلاع** — سيبدأ بنجاح ظاهريًا، وسيفشل فقط لاحقًا **عند أول محاولة تسجيل دخول فعلية**، برسالة خطأ أقل وضوحًا بكثير من "متغيّر بيئة مفقود".

### Environment-specific Configuration — كيف تختلف البيئات هنا

| | Development | Production |
|---|---|---|
| `synchronize` (قاعدة البيانات) | `true` | `false` |
| ملف البيئة | `.env` | `.env.production` |
| Docker Compose | `docker-compose.dev.yml` (Postgres+RabbitMQ فقط، التطبيق يعمل محليًا) | `docker-compose.production.yml` (كل شيء داخل Docker) |
| منفذ قاعدة البيانات المُعاد توجيهه | `5440` | (داخلي فقط ضمن شبكة Docker) |

---

# PART 22 — External Services

> أي خدمة **خارج** حدود التطبيق نفسه (وخارج قاعدة البيانات المباشرة) يتواصل معها المشروع. لكل واحدة سنجيب على نفس الأسئلة السبعة.

## Cloudinary

**ما هي؟** خدمة سحابية متخصصة في تخزين وتحويل الصور والفيديوهات — بديل عن تخزين الملفات مباشرة على قرص السيرفر.

**لماذا نحتاجها؟** تخزين الملفات على قرص السيرفر نفسه له مشاكل حقيقية: لا يُشارَك تلقائيًا لو كان لديك أكثر من سيرفر (Load Balancing)، لا يُنسخ احتياطيًا تلقائيًا، ولا يوفّر روابط CDN سريعة عالميًا. Cloudinary يحل كل هذا (ويضيف تحويلات صور جاهزة، غير مُستخدَمة هنا حاليًا).

**أين تُستخدم؟** `src/common/services/cloudinary.service.ts` — رفع/حذف صور شرائح Onboarding، ورفع/حذف/استبدال فيديوهات التمارين.

**كيف يتواصل المشروع معها؟** عبر الـ SDK الرسمي (`cloudinary` npm package)، وليس عبر استدعاءات HTTP يدوية:
```ts
@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadImage(file: Express.Multer.File, folder: string) {
    const result = await cloudinary.uploader.upload(
      `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,  // ← الملف يُحوَّل لنص base64 كامل في الذاكرة
      { folder, resource_type: 'image' },
    );
    return { secure_url: result.secure_url, public_id: result.public_id };
  }
}
```

**ما البيانات المُرسَلة؟** الملف نفسه (محوَّل base64) + اسم مجلد التصنيف (`'onboarding'` أو `'workouts/videos'`).

**ما الذي يعود؟** رابط دائم (`secure_url`) لعرض الملف، ومعرّف فريد (`public_id`) نحتاجه لاحقًا **لحذف نفس الملف** عند التعديل/الحذف.

**عند الفشل؟** الرفع يُترجَم فورًا لـ `BadRequestException` (رسالة واضحة للعميل). **الحذف** عكس ذلك — عند فشله (مثلًا أثناء تعديل تمرين موجود)، يُسجَّل تحذير فقط والعملية تكمل (قد يترك ملفات "يتيمة" على Cloudinary لا تُشار إليها من أي مكان في القاعدة).

## RabbitMQ (تكامل النقل، التفاصيل الكاملة في Part 24)

**ما هي؟** وسيط رسائل (Message Broker) — نظام منفصل يستقبل "رسائل" من مُرسِلين ويوزّعها على مُستهلِكين، بشكل غير متزامن تمامًا.

**لماذا نحتاجها؟** لفصل عملية بطيئة (إرسال بريد فعلي عبر SMTP) عن دورة حياة طلب HTTP — تفصيل كامل في Part 24.

## Google Gemini (عبر LangChain)

**ما هي؟** نموذج ذكاء اصطناعي توليدي (LLM) من Google، يُستخدَم هنا لتوليد ردود محادثة مخصَّصة.

**لماذا LangChain وليس استدعاء Gemini API مباشرة؟** `LangChain` مكتبة تجريدية فوق نماذج LLM متعددة — توفر أدوات جاهزة لبناء الـ prompts (`ChatPromptTemplate`)، إدارة سياق المحادثة (`MessagesPlaceholder`)، والبث (`.stream()`) — بدل التعامل مع تفاصيل HTTP الخام لكل مزوّد نموذج بشكل مختلف.

**أين تُستخدم؟** `src/modules/ai/ai.module.ts` (تهيئة النموذج) + `src/modules/ai-chat/ai-chat.service.ts` (الاستخدام الفعلي).

**كيف يتواصل المشروع معها؟**
```ts
const prompt = ChatPromptTemplate.fromMessages([
  ['system', FITNESS_SYSTEM_PROMPT],       // ← تعليمات ثابتة تحدد شخصية المساعد
  new MessagesPlaceholder('chat_history'), // ← مكان تاريخ المحادثة السابق (آخر 10 رسائل فقط)
  ['human', '{input}'],                     // ← رسالة المستخدم الحالية
]);
const chain = prompt.pipe(this.geminiModel);
const stream = await chain.stream({ name, age, goal, activity, gender, chat_history, input: userMessage });
```

**ما البيانات المُرسَلة؟** الـ System Prompt الثابت (من `src/common/utils/fitness-prompt.ts`) + بيانات بروفايل المستخدم (اسم/عمر/هدف/نشاط/جندر) + آخر 10 رسائل من المحادثة + الرسالة الجديدة.

**ما الذي يعود؟** بث (stream) من "أجزاء" رد نصية، تُجمَّع بالكامل داخل الـ Service قبل إعادتها كنص كامل واحد للعميل (وليس بثًا حقيقيًا يصل للعميل تدريجيًا — راجع Part 5).

**عند الفشل؟** كل شيء (حفظ رسالة المستخدم + استدعاء النموذج + حفظ الرد) داخل معاملة قاعدة بيانات واحدة (Part 12) ملفوفة بـ `try/catch` → `BadRequestException('Failed to get response from AI')`.

---

# PART 23 — File Uploads / Storage

### الفكرة العامة لرفع الملفات في HTTP

طلب HTTP عادي جسمه JSON (نص). لرفع **ملف ثنائي** (صورة، فيديو)، نحتاج صيغة مختلفة: `multipart/form-data` — تسمح بحزم عدة "أجزاء" (حقول نصية عادية + ملفات ثنائية) في طلب واحد.

### Multer — كيف يتعامل NestJS مع هذا

`Multer` هي المكتبة (تعمل تحت Express) التي تستخرج الملفات من طلب `multipart/form-data`. NestJS يوفر `FileInterceptor` كواجهة نظيفة فوقها:
```ts
@UseInterceptors(FileInterceptor('image'))   // 'image' = اسم الحقل المتوقَّع في الفورم
async create(
  @Body() dto: CreateOnboardingDto,
  @UploadedFile(createImageValidation({})) file: Express.Multer.File,
) { ... }
```
`FileInterceptor` (Interceptor فعليًا — راجع Part 18) يعترض الطلب **قبل** الوصول للـ Handler، يستخرج الملف من الحقل المسمّى، ويجعله متاحًا عبر `@UploadedFile()`.

### Upload Flow الكامل — من العميل حتى Cloudinary

```mermaid
sequenceDiagram
  participant C as Client
  participant FI as FileInterceptor('image')
  participant VP as createImageValidation Pipe
  participant Ctrl as OnboardingController
  participant Svc as OnboardingService
  participant CS as CloudinaryService
  participant CL as Cloudinary

  C->>FI: POST /api/onboarding (multipart: title, description, image)
  FI->>FI: استخرج الملف من الحقل "image" إلى الذاكرة (memory storage)
  FI->>VP: file جاهز، مرّره للتحقق
  VP->>VP: تحقق النوع (jpeg/png/webp/gif) والحجم (≤5MB)
  VP -- فشل --> C2["422 Unprocessable Entity"]
  VP -- نجاح --> Ctrl
  Ctrl->>Svc: create(dto, file)
  Svc->>CS: uploadImage(file, 'onboarding')
  CS->>CL: cloudinary.uploader.upload(base64 data URI)
  CL-->>CS: {secure_url, public_id}
  CS-->>Svc: {secure_url, public_id}
  Svc->>Svc: احفظ السجل في قاعدة البيانات مع secure_url/public_id
  Svc-->>C: 201 + بيانات الشريحة (بما فيها رابط الصورة)
```

### Validation — لماذا هي حرجة هنا تحديدًا

رفع الملفات هو **أحد أخطر نقاط الدخول** في أي API، لأن:
- ملف كبير جدًا بلا حد أقصى = استنزاف ذاكرة/تخزين (DoS).
- ملف بنوع غير متوقَّع (مثلًا سكربت تنفيذي مُقنَّع كصورة) = خطر تنفيذ كود لاحقًا لو أُعيد تقديمه بطريقة خاطئة.

`createImageValidation()` (شُرحت كاملة في Part 17) تعالج هذا لـ Onboarding **فقط**.

### Storage — أين تُخزَّن الملفات فعليًا؟

**لا يُخزَّن أي ملف على قرص السيرفر نفسه أبدًا.** الملف يُقرأ بالكامل في **ذاكرة** السيرفر (memory storage الافتراضي لـ Multer مع Nest، بدون إعداد مخصَّص)، يُحوَّل مباشرة لـ base64، ويُرفَع لـ Cloudinary — السيرفر نفسه لا يحتفظ بأي نسخة دائمة.

### URLs — كيف تُستخدَم بعد الرفع

`secure_url` الراجع من Cloudinary يُخزَّن مباشرة كنص في عمود قاعدة البيانات (`onboarding.secure_url`, `workouts.videoUrl`) — هذا هو الرابط الذي يستخدمه العميل مباشرة لعرض الصورة/الفيديو (لا يمر عبر السيرفر الخاص بنا مطلقًا بعد الرفع الأولي).

### مقارنة أمنية مباشرة: Onboarding مقابل Workout

| | Onboarding (صورة) | Workout (فيديو) |
|---|---|---|
| تحقق النوع | ✔ (jpeg/png/webp/gif فقط) | ✘ لا يوجد |
| تحقق الحجم | ✔ (5MB كحد أقصى) | ✘ لا يوجد |
| Pipe مستخدَم | `createImageValidation()` | لا يوجد |
| الخطر العملي | محدود | استنزاف ذاكرة محتمل عبر ملفات كبيرة جدًا |

**الدرس الأهم في هذا القسم**: نفس النمط التقني بالضبط (`FileInterceptor` + `@UploadedFile()`) طُبِّق في مكانين، بمستوى حماية **مختلف تمامًا** — لأن أحدهما "نسي" إضافة Pipe التحقق. هذا يثبت عمليًا أن **النمط الصحيح موجود في نفس المشروع** — المشكلة ليست جهلاً بكيفية الحماية، بل **عدم اتساق** في تطبيقها.

---

# PART 24 — Emails & Queues

> هذا القسم يغطي فقط ما هو موجود فعليًا في المشروع: البريد الإلكتروني عبر طابور رسائل. **لا يوجد** في هذا المشروع: مدفوعات (Payments)، إشعارات push، أو أي طابور آخر غير `email_queue` — لن نخترع أقسامًا لها.

### لماذا طابور (Queue) بدل استدعاء SMTP مباشرة؟

تخيّل `register()` يستدعي `nodemailer.sendMail()` مباشرة داخل الطلب: العميل ينتظر حتى يكتمل الاتصال بخادم SMTP الخارجي (قد يستغرق ثوانٍ، أو يفشل مؤقتًا) **قبل** أن يحصل على رد "تم التسجيل بنجاح" — رغم أن التسجيل نفسه **نجح فعليًا** في قاعدة البيانات منذ اللحظة الأولى. الحل: **افصل** إرسال البريد تمامًا عن استجابة HTTP.

### RabbitMQ — المفهوم العام

نظام منفصل تمامًا (عملية/خدمة قائمة بذاتها، تعمل هنا داخل حاوية Docker خاصة بها) يستقبل "رسائل" من **منتِجين (Producers)** ويسلّمها لـ **مستهلكين (Consumers)** عبر **طابور (Queue)** بالاسم. الميزة الأساسية: المنتِج **لا ينتظر** أن يعالج المستهلك الرسالة فعليًا — فقط "يرسلها وينسى" (fire-and-forget)، أو "يرسل وينتظر تأكيد استلام فقط" (ليس تنفيذًا كاملاً).

### كيف يتصل مشروعنا به — الجانبان معًا

هذا مثال نادر ومهم على **hybrid application** في NestJS — نفس عملية Node الواحدة تعمل **كمنتِج وكمستهلك في آن واحد**، لكن من موديولين مختلفين تمامًا:

```mermaid
flowchart LR
  subgraph Process["نفس عملية Node الواحدة"]
    Auth["AuthService<br/>(منتِج/Producer)"]
    Mail["MailProcessor<br/>(مستهلك/Consumer)"]
  end
  Auth -- "emit('email.send', payload)" --> Q[("RabbitMQ<br/>email_queue")]
  Q -- "@EventPattern('email.send')" --> Mail
  Mail --> SMTP[SMTP Server]
```

### الجانب المنتِج — `AuthModule`

```ts
// auth.module.ts
ClientsModule.registerAsync([{
  name: 'EMAIL_QUEUE',                        // ← نفس الاسم المستخدَم في @Inject('EMAIL_QUEUE')
  useFactory: (configService: ConfigService) => ({
    transport: Transport.RMQ,
    options: { urls: [configService.get('RABBITMQ_URL')], queue: 'email_queue', queueOptions: { durable: true } },
  }),
  inject: [ConfigService],
}]),
```
`durable: true` يعني: الطابور نفسه **يبقى موجودًا** حتى لو أُعيد تشغيل RabbitMQ (لا يُحذَف تلقائيًا) — رسائل لم تُستهلَك بعد لا تُفقَد عند إعادة تشغيل الوسيط نفسه.

الإرسال الفعلي، من `AuthService.register()`:
```ts
this.emailClient.emit('email.send', {
  to: savedUser.email,
  subject: 'Welcome to FTNS!',
  template: 'welcome',
  context: { firstName: savedUser.firstName },
});
```
`emit()` (وليس `send()`) هو تحديدًا نمط **"Event" غير المنتظِر لرد** (fire-and-forget) في NestJS Microservices — لا `await` قبله، الكود يتابع فورًا للسطر التالي بغض النظر عن نجاح النشر على الطابور.

### الجانب المستهلك — `MailModule`

```ts
// mail.processor.ts
@Controller()   // ← لاحظ: @Controller() هنا أيضًا، لكن بلا أي @Get/@Post — لأنه لا يستجيب لـ HTTP إطلاقًا
export class MailProcessor {
  constructor(private readonly mailService: MailService) {}

  @EventPattern('email.send')   // ← يستمع لأي رسالة على هذا "الحدث" تحديدًا، بدل @Get/@Post
  async handleSendEmail(@Payload() data: MailOptions) {
    try {
      await this.mailService.sendMail(data);
      this.logger.log(`Email sent to ${data.to} [template: ${data.template}]`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${data.to}`, /* ... */);
      throw error;   // ← يُعاد رميه، ليعتمد على سلوك RabbitMQ الافتراضي (requeue/reject)
    }
  }
}
```
`@EventPattern('email.send')` هو **معادل** `@Post('...')` لكن لعالم الرسائل غير المتزامنة بدل HTTP — نفس فكرة "استمع لهذا النمط تحديدًا"، بس المصدر مختلف (طابور رسائل بدل طلب HTTP).

### `MailService` — التنفيذ الفعلي

```ts
async sendMail(options: MailOptions) {
  const { to, subject, template, context } = options;
  const html = this.renderTemplate(template, context);   // ← Handlebars يملأ القالب .hbs بالبيانات
  await this.transporter.sendMail({ from: this.configService.get('SMTP_FROM'), to, subject, html });
}
```
القوالب (`welcome.hbs`, `forgot-password.hbs`, `change-email.hbs`, `verify-email.hbs`) موجودة في `src/modules/mail/templates/`، ويُغلَّف كل قالب داخل `layout.hbs` مشترك (إن وُجد) قبل الإرسال.

### عند الفشل — ماذا يحدث فعليًا؟

- **فشل النشر على الطابور** (RabbitMQ غير متاح مثلًا): `emit()` لا ينتظر تأكيدًا أصلاً، فالكود المستدعي **لن يعرف** بالفشل إطلاقًا — التسجيل ينجح في قاعدة البيانات، لكن لا بريد يُرسَل، وبلا أي إشعار.
- **فشل الإرسال الفعلي عبر SMTP** (داخل `MailProcessor`): يُسجَّل الخطأ ويُعاد رميه — يعتمد على إعدادات RabbitMQ الافتراضية لتحديد ماذا يحدث للرسالة (إعادة محاولة أو رفض)؛ لا إعداد صريح لـ Dead Letter Queue (DLQ) أو عدد محاولات محدَّد في الكود.

**الدرس العملي**: أنظمة "fire-and-forget" ممتازة لتحرير المستخدم من الانتظار، لكنها **تفقد** رؤية مباشرة لحالة النجاح/الفشل — قرار تصميمي واعٍ يجب أن يوازن دائمًا بين سرعة الاستجابة وموثوقية التنفيذ.

---

# PART 25 — Testing

### Unit Testing

اختبار **وحدة واحدة معزولة** من الكود (دالة، أو Service كامل) — مع استبدال **كل** اعتمادياتها بكائنات وهمية (mocks)، بحيث لا نختبر شيئًا آخر غير المنطق الداخلي للوحدة نفسها. هذا **النوع الوحيد** من الاختبارات الموجود فعليًا في هذا المشروع.

### Integration Testing

اختبار **تفاعل حقيقي** بين أكثر من جزء (مثلًا: Service حقيقي + قاعدة بيانات حقيقية أو تجريبية، بدل mock). **غير موجود** في هذا المشروع — كل الاختبارات تستبدل `Repository` بكائن وهمي، لا اتصال قاعدة بيانات حقيقي في أي اختبار.

### E2E (End-to-End)

اختبار **يشغّل التطبيق كاملاً فعليًا** (خادم HTTP حقيقي يعمل) ويرسل له طلبات حقيقية (عبر أداة مثل `supertest`)، للتحقق من السلوك الكامل من طرف لطرف. **غير موجود فعليًا** رغم وجود سكربت `test:e2e` في `package.json` — لا يوجد مجلد `test/` في المشروع، فتشغيل هذا السكربت يفشل فورًا.

### Mocking — كيف يعمل فعليًا في هذا المشروع

راجعنا هذا في [Part 8](#part-8--dependency-injection) — الفكرة: نستبدل أي Provider حقيقي بكائن مزيَّف عبر `TestingModule`:
```ts
const module: TestingModule = await Test.createTestingModule({
  providers: [
    AuthService,   // ← الكلاس الحقيقي الذي نختبره فعليًا
    { provide: getRepositoryToken(UserEntity), useValue: mockUserRepository },  // ← استبدال
    { provide: JwtService, useValue: mockJwtService },
  ],
}).compile();
service = module.get<AuthService>(AuthService);
```
`getRepositoryToken(UserEntity)` تُعيد **نفس** الـ Token الداخلي الذي يستخدمه `@InjectRepository(UserEntity)` — لهذا الاستبدال يعمل بدقة، رغم أن `AuthService` لم يُكتَب أصلاً "ليكون قابلاً للاختبار" بشكل خاص؛ DI جعله كذلك تلقائيًا.

### بنية اختبار نموذجية (نمط AAA: Arrange, Act, Assert)

```ts
it('should throw UnauthorizedException with invalid password', async () => {
  // Arrange — جهّز البيانات والمزيّفات
  mockUserRepository.findOne.mockResolvedValue(mockUser);
  jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

  // Act + Assert (مدمجَين هنا بسبب طبيعة اختبار استثناء)
  await expect(
    service.login({ email: 'test@example.com', password: 'wrongpassword' }),
  ).rejects.toThrow(UnauthorizedException);
});
```
لاحظ `jest.spyOn(bcrypt, 'compare')` — حتى مكتبة خارجية (`bcrypt`) نفسها استُبدلت مؤقتًا خلال الاختبار، لضمان أن الاختبار **لا يعتمد** على حساب هاش فعلي بطيء، وللتحكّم الكامل في نتيجة المقارنة (`true`/`false`) بغض النظر عن القيم الفعلية المُمرَّرة.

### تقييم تغطية الاختبارات في هذا المشروع

| الملف | العمق |
|---|---|
| `auth.service.spec.ts` | **جيد** — 6 سيناريوهات مختلفة (login، register، forgotPassword، refreshTokens، logout، verifyEmail)، بحالات نجاح وفشل. |
| `users.service.spec.ts` | **جيد** — يغطي كل دوال `UsersService` تقريبًا. |
| `category.service.spec.ts`, `category-group.service.spec.ts`, `ai-chat.service.spec.ts` | متوسط. |
| `auth.guard.spec.ts` | **سطحي جدًا** — اختبار وحيد يتحقق فقط أن الكلاس `toBeDefined()`، **لا** يختبر منطق التحقق من التوكن نفسه إطلاقًا. |
| Controllers (`category.controller.spec.ts`, `category-group.controller.spec.ts`, `ai-chat.controller.spec.ts`) | سطحية جدًا (`should be defined` فقط). |

**بلا أي اختبار إطلاقًا**: `RolesGuard`، `TransformInterceptor`، `AllExceptionsFilter`، `CloudinaryService`، Onboarding/Workout/Food/CategorySegment (كل service وcontroller)، `MailService`/`MailProcessor`.

### تمرين ذهني مفيد (بدون تنفيذ الآن — هذا الكتاب Analysis فقط)

لو أردت لاحقًا كتابة اختبار لـ `RolesGuard` (المفقود تمامًا)، ما الذي تحتاج تزييفه؟ تأمّل الكود من Part 16: `RolesGuard` يحتاج `Reflector` (يمكن تزييفه بـ `{getAllAndOverride: jest.fn()}`) و`ExecutionContext` (يمكن تزييفه بكائن يوفر `switchToHttp().getRequest()` يُعيد `{user: {type: 'user'}}`). سيناريوهان أساسيان يستحقان الاختبار: (1) لا `@Roles` على المسار → يُسمح دائمًا، (2) `@Roles(['admin'])` بينما `user.type === 'user'` → يجب أن يرمي `ForbiddenException`.

---

# PART 26 — Docker & Deployment

### Docker — المفهوم العام

مشكلة قديمة في Backend: "يعمل على جهازي، لماذا لا يعمل على السيرفر؟" — بسبب اختلاف إصدار Node، مكتبات نظام التشغيل، إلخ. **Docker** يحل هذا عبر **تغليف** التطبيق مع **كل** ما يحتاجه ليعمل (إصدار Node محدَّد، الاعتماديات، نظام ملفات كامل) في وحدة واحدة قابلة للنقل: **Image**.

### Image مقابل Container

- **Image**: "القالب" — لقطة كاملة وثابتة (لا تتغيّر) لكل ما يحتاجه التطبيق ليعمل.
- **Container**: نسخة **قيد التشغيل فعليًا** من Image — يمكن تشغيل عدة Containers من نفس Image الواحد في نفس الوقت.

### `Dockerfile` — كيف نبني Image لهذا المشروع

المشروع يستخدم بناءً **متعدد المراحل (multi-stage build)** — تقنية مهمة يجب فهمها. من `Dockerfile` (المُستخدَم فعليًا):

```dockerfile
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci                          # يثبّت كل الاعتماديات (بما فيها devDependencies)

FROM base AS build
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build                    # يبني TypeScript → JavaScript (مجلد dist/)

FROM node:20-alpine AS production
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules   # ← ينسخ فقط الاعتماديات المُثبَّتة
COPY --from=build /app/dist ./dist                    # ← ينسخ فقط الكود المُترجَم النهائي
COPY --from=build /app/package*.json ./
ENV NODE_ENV=production
EXPOSE 5010
CMD ["node", "dist/main"]
```

**لماذا 3 مراحل، وليس مرحلة واحدة؟** المرحلتان الأوليان (`base`, `build`) تحتاجان أدوات ثقيلة (TypeScript compiler، devDependencies بأكملها — مثل `jest`, `eslint`) **فقط لعملية البناء نفسها**. المرحلة النهائية (`production`) تنسخ **فقط** الناتج الجاهز (`dist/` المُترجَم + `node_modules` الفعلية) — **دون** أي كود مصدري TypeScript خام، ولا أدوات التطوير. النتيجة: Image إنتاجي أصغر حجمًا بكثير وأكثر أمانًا (لا يحتوي أدوات/كودًا غير ضروري).

```mermaid
flowchart LR
  A["base: تثبيت الاعتماديات"] --> B["build: npm run build → dist/"]
  B --> C["production: انسخ فقط dist/ + node_modules<br/>الصورة النهائية الصغيرة والنظيفة"]
```

### docker-compose — تنسيق عدة حاويات معًا

تطبيقنا لا يعمل وحده — يحتاج PostgreSQL وRabbitMQ أيضًا. `docker-compose` يصف **كل** الخدمات المطلوبة في ملف واحد، ويشغّلها معًا بأمر واحد.

**`docker-compose.dev.yml`** — Postgres + RabbitMQ فقط (التطبيق نفسه يعمل خارج Docker محليًا، عبر `npm run start:dev`، لسهولة إعادة التحميل السريع أثناء التطوير):
```yaml
services:
  postgres-db:
    image: postgres:16.2-alpine3.19
    ports: ["5440:5432"]
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U fitness-app -d fitness-app"]
```

**`docker-compose.production.yml`** — الثلاثة معًا (Postgres + RabbitMQ + `fitness-api`)، على شبكة معزولة، مع **ترتيب إقلاع مضبوط**:
```yaml
fitness-api:
  build: { context: ., dockerfile: Dockerfile, target: production }  # ← يستهدف مرحلة "production" تحديدًا
  depends_on:
    postgres-db: { condition: service_healthy }   # ← لا يبدأ التطبيق قبل أن تكون القاعدة "صحية" فعليًا
    rabbitmq: { condition: service_healthy }
  healthcheck:
    test: ["CMD", "wget", "--spider", "http://localhost:5010/api/health"]
```

**لماذا `depends_on` مع `condition: service_healthy` مهم؟** بدونه، Docker يضمن فقط أن الحاوية **بدأت** (started)، وليس أنها **جاهزة فعليًا** لاستقبال اتصالات (Postgres قد يستغرق ثوانٍ إضافية بعد "البدء" ليصبح جاهزًا). هذا كان سيسبب فشل اتصال التطبيق بقاعدة البيانات عند أول إقلاع، لولا انتظار `service_healthy`.

### Health Checks — نقطة الالتقاء بين الكود والبنية التحتية

`GET /api/health` (من `src/common/health.controller.ts`) ليس مجرد endpoint عادي — إنه **العقد** الذي يعتمد عليه Docker نفسه ليقرر "هل هذا الـ Container صحي؟":
```ts
@Get()
async check() {
  const dbConnected = await this.checkDatabase();  // SELECT 1 فعلي على قاعدة البيانات
  if (dbConnected) return { status: 'ok', timestamp: new Date().toISOString(), database: 'connected' };
  throw new Error('Database connection failed');
}
```
هذا مثال ممتاز على كيف يتقاطع كود التطبيق مباشرة مع طبقة DevOps — الـ healthcheck في `docker-compose.production.yml` يستدعي **هذا المسار بالذات فعليًا**.

### Environment و Build و Production — الفروق العملية بين البيئات

| | التطوير | الإنتاج |
|---|---|---|
| كيف يُشغَّل الكود؟ | `nest start --watch` (يُعيد التحويل والتشغيل تلقائيًا عند كل تعديل) | `node dist/main` (كود مُترجَم مسبقًا فقط) |
| مصدر البيئة | `.env` | `.env.production` |
| منفذ التطبيق | متغيّر (`PORT` في `.env`، افتراضي 3000) | `5010` (مضبوط في `Dockerfile`/compose الإنتاجي) |
| `synchronize` قاعدة البيانات | `true` | `false` |

### ما لا يوجد بعد في هذا المشروع

**لا CI/CD**. لا يوجد `.github/workflows/` ولا أي إعداد pipeline آخر — بناء Image ونشره حاليًا **يدوي بالكامل** (أوامر `docker build`/`docker-compose up` تُنفَّذ يدويًا، وفق تعليمات الـ README). فحص الجودة (`lint-staged` عبر Husky) يعمل **محليًا فقط عند كل commit**، وليس كبوابة إلزامية قبل الدمج/النشر.

---

# PART 27 — Security

> هذا القسم يجمع كل ما تعلمناه سابقًا (Guards، Validation، Password Hashing، Exception Handling) من **زاوية أمنية واحدة**: ماذا طُبِّق فعليًا؟ وماذا يمكن تحسينه؟

### Authentication — ما المُطبَّق؟

✔ bcrypt (10 جولات) لكل كلمة مرور/توكن مخزَّن. ✔ توكنان منفصلان (access قصير/refresh طويل، أسرار مختلفة). ✔ `AuthGuard` يُعيد تحميل المستخدم من القاعدة في كل طلب (وليس الثقة بمحتوى التوكن فقط). ✔ رسائل خطأ موحَّدة لمنع Enumeration في `login`/`forgotPassword`.

**ما يمكن تحسينه؟** لا فرض لـ `isEmailVerified` قبل الدخول (راجع Part 14 — قرار غير موثَّق). لا كشف لإعادة استخدام refresh token مسروق (rotation family).

### Authorization — ما المُطبَّق؟

✔ فصل واضح بين Guard المصادقة وGuard التفويض. ✔ ترتيب صحيح ومتّسق (`AuthGuard` ثم `RolesGuard`) في كل مكان **ما عدا واحد**.

**ما يمكن تحسينه؟** `AiChatController` يطبّق `@Roles()` بلا `RolesGuard` فعلي — تفصيل كامل في Part 16، درس عملي حي عن خطورة الاعتماد على وجود decorator بصريًا فقط.

### Passwords — ما المُطبَّق؟

✔ Regex قوي مفروض في كل DTO يستقبل كلمة مرور (حروف كبيرة+صغيرة+رقم+رمز خاص، 8 أحرف على الأقل). ✔ منع استخدام نفس كلمة المرور القديمة عند التغيير.

### JWT — ما المُطبَّق؟

✔ أسرار مختلفة تمامًا لتوكن الوصول وتوكن التجديد (لو سُرق سرّ أحدهما، الآخر يبقى آمنًا). ✔ صلاحية قصيرة لتوكن الوصول (15 دقيقة).

**ما يمكن تحسينه؟** لا قائمة إبطال (blacklist) لتوكن الوصول عند تسجيل الخروج — قرار مقبول لمدة قصيرة كهذه، لكنه صريح ويستحق التوثيق كقرار وليس إغفالاً.

### Input Validation — ما المُطبَّق؟

✔ `ValidationPipe` عام مع `whitelist`+`forbidNonWhitelisted` يمنع Mass Assignment (Part 10). ✔ استعلامات TypeORM مُعامَلة (parameterized) في كل مكان — لا تركيب نصوص SQL يدويًا (Part 12) → **لا ثغرات SQL Injection ظاهرة في الكود المفحوص**. ✔ فحص نوع/حجم ملفات الصور (Onboarding فقط).

**ما يمكن تحسينه؟** رفع فيديو التمارين بلا أي تحقق (Part 23) — أوضح فجوة في هذا المحور.

### Secrets — ما المُطبَّق؟

✔ كل الأسرار عبر متغيرات بيئة، لا قيم مكتوبة في الكود. ✔ `.env` خارج git.

**ما يمكن تحسينه؟** لا تحقق شكل (schema validation) على المتغيرات عند الإقلاع (Part 21) — خطأ إعداد يُكتشَف متأخرًا جدًا.

### CORS — ما المُطبَّق؟

`app.enableCors()` بلا أي خيارات في `main.ts` — يسمح لأي أصل بالاتصال. **مقبول جدًا لمرحلة تطوير/MVP**، لكن **يستحق تقييدًا صريحًا** (قائمة أصول مسموحة) قبل أي نشر إنتاجي فعلي.

### Rate Limiting — ما المُطبَّق؟

`ThrottlerModule` مسجَّل عالميًا لكن **غير مربوط كحارس فعلي إلا على مسار واحد** (`POST /api/ai-chat`) — تفصيل كامل في Part 16. **الفجوة الأخطر عمليًا**: `login`, `register`, `forgot-password`, `verify-reset-code`, `reset-password` بلا أي حد لعدد المحاولات، رغم أنها بالضبط المسارات التي يستهدفها هجوم تخمين آلي (brute-force / credential stuffing).

### File Uploads — ما المُطبَّق؟

راجع Part 23 كاملاً — تناقض واضح بين Onboarding (محكوم) وWorkout (غير محكوم).

### Sensitive Information Exposure — أخطر نقطة في هذا المشروع

**تسريب هاش كلمة المرور فعليًا في استجابات API حقيقية.** هذا يستحق فهمًا عميقًا لأنه **يجمع 3 مفاهيم تعلمناها معًا في مكان واحد**: DI (Part 8)، Interceptors (Part 18)، وطبيعة الـ Decorators (Part 2).

`UserEntity.password` معرَّف كـ:
```ts
@Column()
@Exclude()   // ← من class-transformer
password: string;
```
`@Exclude()` هي decorator من `class-transformer`، تعني: "عند تحويل هذا الكائن لصيغة عادية (plain object) عبر آليات هذه المكتبة تحديدًا، احذف هذا الحقل." **لكن** — وهذه النقطة الحرجة — هذا **لا يحدث تلقائيًا**. يحتاج تفعيلاً صريحًا عبر `ClassSerializerInterceptor` (من `@nestjs/common`)، الذي يستدعي `class-transformer` فعليًا على كل استجابة تخرج.

**بحث كامل في المشروع لم يجد أي استخدام لـ `ClassSerializerInterceptor`** — لا في `main.ts`، لا كـ `APP_INTERCEPTOR`، لا `@UseInterceptors()` على أي Controller يتعامل مع `UserEntity`. النتيجة: NestJS يُعيد الكائن **كما هو**، بكل حقوله بما فيها `password` (الهاش) و`hashedRefreshToken`، عبر آلية التسلسل الافتراضية لـ Express (`res.json()`، التي لا "تعرف" شيئًا عن `@Exclude()` من `class-transformer` إطلاقًا).

**أين يظهر هذا فعليًا؟**
```ts
// AuthService.login() — user هو UserEntity خام كاملاً
return { message: 'Login successful', data: { user, tokens } };
```
```ts
// UsersController.getProfile() — نفس المشكلة
async getProfile(@Request() req: UserReq) {
  return await this.usersService.getProfile(req.user.id);  // يُعيد UserEntity خام
}
```
وأخطر مثال: `GET /api/users` (قائمة كل المستخدمين، مقتصرة على ADMIN) — تُعيد هاش **كل** مستخدم في النظام دفعة واحدة.

**لماذا `register()` غير متأثر؟** لأنه (كما رأينا في Part 14) يبني كائن الرد **يدويًا**، حقلاً بحقل، بدل إعادة `UserEntity` مباشرة — حل عملي، لكنه **غير متّسق**: باقي المسارات لا تفعل نفس الشيء.

**كيف كان `@Exclude()` سيعمل فعلاً؟** بربط `ClassSerializerInterceptor` عالميًا (أو على الأقل على `UsersController`/`AuthController`) — تمامًا كما ناقشنا مع `TransformInterceptor` في Part 18: **الكود الصحيح مكتوب جزئيًا (الـ decorator)، لكن القطعة التي "تُفعِّله" (الـ Interceptor) غائبة**. هذا نمط تكرر مرتين في نفس المشروع (`@Exclude()` هنا، `TransformInterceptor` في Part 18) — درس عام مهم: **في NestJS، معظم "الحماية التصريحية" (declarative) — decorators تصف نية — تحتاج طرفًا آخر فعليًا "يقرأها وينفّذها" وقت التشغيل. لا تفترض أبدًا أن وجود decorator يعني أن أثره فعّال.**

### Error Exposure — ما المُطبَّق؟

✔ `stack trace` لا يُعاد للعميل أبدًا حتى في التطوير (يُسجَّل فقط في اللوج). ✔ خارج الإنتاج فقط، `timestamp` يُضاف للاستجابة (بلا معلومات حساسة). ✔ داخل الإنتاج، أي تفاصيل زمنية إضافية تُحذَف تلقائيًا (`process.env.NODE_ENV !== 'production'` guard في `AllExceptionsFilter`).

### ملخص جدولي — للمراجعة السريعة فقط (التفاصيل الكاملة أعلاه)

| المحور | الحالة |
|---|---|
| تسريب هاش كلمة المرور | 🔴 حرج — مؤكَّد بالكود |
| Rate limiting على مسارات المصادقة | 🟠 غير مفعَّل فعليًا |
| تحقق رفع فيديو التمارين | 🟠 غير موجود |
| اتساق منع Enumeration | 🟡 جزئي (`forgotPassword` ✔، `register` ✘) |
| CORS | 🟡 مفتوح بالكامل |
| SQL Injection | 🟢 لا ثغرات ظاهرة (استعلامات مُعامَلة بالكامل) |
| كلمات المرور | 🟢 bcrypt + regex قوي في كل مكان |
| Mass Assignment | 🟢 محمي عبر `whitelist`+`forbidNonWhitelisted` |
| تسريب Stack Trace | 🟢 لا يحدث أبدًا |

---

# PART 28 — Complete Feature Flows

> كل قسم من الأقسام السابقة شرح **مفهومًا** واحدًا عبر أمثلة. هذا القسم يعكس الاتجاه: نأخذ **ميزة كاملة**، ونتتبعها من أول حرف يكتبه المستخدم حتى آخر بايت يعود له، عابرين كل المفاهيم معًا.

## Feature Flow 1 — User Registration

```mermaid
flowchart TD
  A[Client] --> B["POST /api/auth/register<br/>{firstName,lastName,email,password}"]
  B --> C["Global ValidationPipe → RegisterDto"]
  C --> D["AuthController.register(dto)"]
  D --> E["AuthService.register(dto)"]
  E --> F["userRepository.findOne({where:{email}})"]
  F --> G{موجود مسبقًا؟}
  G -- نعم --> H["ConflictException('Email already registered') → 409"]
  G -- لا --> I["bcrypt.hash(password, 10)"]
  I --> J["crypto.randomBytes(32).toString('hex')<br/>توكن تحقق البريد"]
  J --> K["userRepository.create + save<br/>isEmailVerified:false افتراضيًا"]
  K --> L["emailClient.emit('email.send', ترحيب) — fire-and-forget"]
  K --> M["emailClient.emit('email.send', رابط تحقق) — fire-and-forget"]
  M --> N["201 Created + بيانات آمنة (بلا password)"]
  H --> Z[AllExceptionsFilter → 409 JSON موحّد]
```

### خطوة بخطوة

**1. التحقق من الشكل (What/Why/Where/How)**
- *What*: `RegisterDto` يفرض 4 حقول، بينها `password` بقواعد قوة صارمة.
- *Why*: منع أي بيانات غير مكتملة/فاسدة من الوصول لـ `AuthService` أصلاً.
- *Where*: `Global ValidationPipe` (`main.ts`) + `src/modules/auth/dto/register.dto.ts`.
- *ماذا لو فشلت؟*: 400 فورًا، الكود التالي لا يُنفَّذ إطلاقًا.

**2. التحقق من عدم التكرار**
- *What*: استعلام `SELECT` على `email`.
- *Why*: `email` عمود `unique` في قاعدة البيانات أصلاً — لكن التحقق اليدوي هنا يسمح برسالة خطأ **واضحة** (`ConflictException`) بدل السماح لقاعدة البيانات ترمي خطأ قيد (constraint violation) غامضًا يصل كـ 500 عبر `AllExceptionsFilter` (راجع Part 20، قسم Database Errors).
- *ماذا لو فشلت؟*: 409 Conflict.

**3. تجزئة كلمة المرور**
- *What*: `bcrypt.hash(password, 10)`.
- *Why*: لا نخزّن كلمات المرور كنص صريح أبدًا (Part 14).
- *ماذا يحدث داخليًا؟*: عملية حسابية بطيئة عمدًا (10 "جولات") — تستغرق أجزاء من الثانية، لكن هذا مقصود لإبطاء أي محاولة تخمين آلي مستقبلي.

**4. بناء توكن التحقق**
- *What*: `crypto.randomBytes(32).toString('hex')` — 32 بايت عشوائية حقيقية (وليس فقط رقمًا عشوائيًا بسيطًا)، محوَّلة لنص hex.
- *Why*: يجب أن يكون هذا التوكن **غير قابل للتخمين إطلاقًا** — يُستخدَم كرابط مباشر (`GET /auth/verify-email?token=...`) بلا أي طبقة حماية إضافية غير كونه سريًا بحد ذاته.

**5. الحفظ**
- *What*: `create()` (في الذاكرة) ثم `save()` (كتابة فعلية).
- *ماذا لو فشل الحفظ؟* (اتصال قاعدة بيانات فُقد مثلًا): `Error` عادي، غير `HttpException` → يسقط لفرع `500` في `AllExceptionsFilter`.

**6. إشعار البريد (غير متزامن بالكامل)**
- *What*: رسالتان منفصلتان تُنشَران على `email_queue` (ترحيب + تحقق).
- *Why*: فصل زمن إرسال البريد الفعلي عن استجابة HTTP (Part 24).
- *ماذا لو فشل النشر أو الإرسال؟*: العميل **لا يعرف أبدًا** — التسجيل نجح فعليًا في قاعدة البيانات بغض النظر (فجوة تصميمية موثَّقة في Part 27/24).

**7. الاستجابة النهائية**
- *What*: كائن مبني يدويًا، حقول آمنة فقط.
- *Why*: أهم قرار أمني إيجابي في هذه الميزة بأكملها — الوحيدة التي "تتذكر" ألا تُعيد الكيان الخام (راجع مقارنته مع `login()` في Part 27).

## Feature Flow 2 — Login ثم طلب محمي (رحلة كاملة عبر توكن واحد)

```mermaid
flowchart TD
  subgraph Login["1) تسجيل الدخول"]
    A["POST /api/auth/login"] --> B["LoginDto validation"]
    B --> C["AuthService.login()"]
    C --> D["bcrypt.compare(password, user.password)"]
    D --> E["createTokens(): access(15m) + refresh(7d)"]
    E --> F["userRepository.update(hashedRefreshToken)"]
    F --> G["200 + {user, tokens}"]
  end
  subgraph Use["2) استخدام access token في طلب محمي"]
    H["Client يخزّن accessToken"] --> I["GET /api/users/profile<br/>Authorization: Bearer accessToken"]
    I --> J["AuthGuard.canActivate()"]
    J --> K["jwtService.verifyAsync(token, JWT_ACCESS_SECRET)"]
    K --> L["usersService.findById(payload.userId)"]
    L --> M["request.user = UserEntity"]
    M --> N["RolesGuard: لا @Roles هنا → سماح"]
    N --> O["UsersController.getProfile(req)"]
    O --> P["200 + UserEntity"]
  end
  G -.-> H
```

**النقطة الأهم في هذا الـ Flow**: التوكن الصادر في الخطوة الأولى (`Login`) هو **بالضبط** ما يُتحقَّق منه في الخطوة الثانية (`Use`) — لا حالة (state) مشتركة أخرى بين الطلبين على السيرفر، فقط التوقيع الرياضي للتوكن نفسه + استعلام قاعدة بيانات جديد لجلب حالة المستخدم الحالية (Part 14).

## Feature Flow 3 — إرسال رسالة للذكاء الاصطناعي (أكثر تدفّق تقني تعقيدًا في المشروع)

```mermaid
flowchart TD
  A["POST /api/ai-chat<br/>{message, sessionId?}"] --> B["AuthGuard (فقط — بلا RolesGuard، راجع Part 16)"]
  B --> C["ThrottlerGuard (10 طلبات/60 ثانية)"]
  C --> D["SendMessageDto validation"]
  D --> E["AiChatController.sendMessage()"]
  E --> F["AiChatService.processUserMessage()"]
  F --> G{sessionId مُرسَل؟}
  G -- نعم --> H["findOne(session) + آخر 10 رسائل"]
  G -- لا --> I["إنشاء جلسة جديدة، العنوان = أول 30 حرف من الرسالة"]
  H --> J["dataSource.transaction() BEGIN"]
  I --> J
  J --> K["احفظ رسالة المستخدم"]
  K --> L["بناء ChatPromptTemplate (system+history+input)"]
  L --> M["chain.stream() → Gemini عبر LangChain"]
  M --> N["اجمع كل الأجزاء في fullResponse واحد"]
  N --> O["احفظ رد الذكاء الاصطناعي"]
  O --> P["COMMIT"]
  P --> Q["201 + {sessionId, response}"]
  M -. فشل .-> R["BadRequestException('Failed to get response from AI')"]
  R --> S[AllExceptionsFilter → 400]
```

### لماذا هذا الـ Flow يستحق دراسة خاصة

يجمع **كل** ما تعلمناه في مكان واحد: Guards (اثنان مختلفان، بترتيب مختلف عن باقي المشروع)، DTO validation، تنسيق Service بين قاعدة بيانات وخدمة خارجية، Transaction لضمان الاتساق، ومعالجة أخطاء محلية تُترجَم لاستثناء واضح قبل الوصول للـ Filter العام. هذا **أفضل مثال واحد** في المشروع لفهم "كيف تتضافر كل اللبنات معًا في ميزة حقيقية".

---

# PART 29 — Complete Request Tracing

> اختر أي طلب من الجدول أدناه، وتتبّعه بنفس الطريقة عبر الملفات/الكلاسات/الدوال المذكورة — تمرين ممتاز للمراجعة الذاتية.

## Request A — `DELETE /api/workouts/42` (حذف مع تنظيف خارجي)

| المرحلة | الملف | الكلاس/الدالة |
|---|---|---|
| Guard (مصادقة) | `src/common/services/guards/auth/auth.guard.ts` | `AuthGuard.canActivate` |
| Guard (تفويض) | `src/common/services/guards/auth/roles.guard.ts` | `RolesGuard.canActivate` — يتطلب `@Roles(UserType.ADMIN)` |
| Pipe (route param) | مدمج من NestJS | `ParseIntPipe` على `@Param('id', ParseIntPipe)` |
| Controller | `src/modules/workout/workout.controller.ts` | `WorkoutController.remove(id)` |
| Service | `src/modules/workout/workout.service.ts` | `WorkoutService.remove(id)` |
| Repository (بحث) | TypeORM | `workoutRepository.findOne` (عبر `findOne()` الداخلية) |
| خدمة خارجية | `src/common/services/cloudinary.service.ts` | `CloudinaryService.deleteVideo(publicId)` — **فقط إن كان يملك فيديو** |
| Repository (حذف) | TypeORM | `workoutRepository.remove(workout)` |
| استجابة | — | `204 No Content` (`@HttpCode(HttpStatus.NO_CONTENT)`) |

**تفصيل مهم**: لو فشل حذف الفيديو من Cloudinary، الكود **لا يوقف** عملية حذف التمرين — فقط `logger.warn(...)` ويكمل (راجع Part 14/22). هذا قرار واعٍ: أولوية حذف السجل من قاعدة البيانات على تنظيف الملف الخارجي بالكامل.

## Request B — `POST /api/category-group` (إنشاء مع تحقق علاقة أب)

| المرحلة | الملف | الكلاس/الدالة |
|---|---|---|
| Guards | نفس النمط أعلاه | `AuthGuard` ثم `RolesGuard` (`@Roles(UserType.ADMIN)`) |
| Pipe | Global ValidationPipe | يتحقق `CreateGroupDto` (`name`, `categoryId`) |
| Controller | `src/modules/category-group/category-group.controller.ts` | `CategoryGroupController.create(body)` |
| Service (تنسيق بين موديولين) | `src/modules/category-group/category-group.service.ts` | `CategoryGroupService.create(body)` |
| استدعاء موديول آخر | `src/modules/category/category.service.ts` | `CategoryService.findCategoryById(body.categoryId)` — يتحقق أن الأب موجود قبل أي شيء آخر |
| تحقق تفرّد | Repository | `categoryGroupRepo.findOne({where:{name}})` |
| الحفظ | Repository | `categoryGroupRepo.create` + `save` |
| استجابة | — | `201` + الكائن المُنشأ (بلا غلاف موحَّد — راجع Part 20) |

**تفصيل مهم**: `CategoryGroupService` يحقن `CategoryService` **مباشرة** (وليس فقط الـ Repository) — مثال حقيقي على Service يستدعي Service **آخر** بدل تكرار منطق التحقق من وجود التصنيف. هذا استخدام صحي لـ DI بين موديولات مختلفة.

## Request C — `GET /api/workouts?difficulty=beginner&page=2` (قراءة مع فلترة معقّدة)

| المرحلة | الملف | الكلاس/الدالة |
|---|---|---|
| Guards | نفس النمط | `AuthGuard` ثم `RolesGuard` (`@Roles(UserType.USER, UserType.ADMIN)`) |
| Pipe (Query DTO) | Global ValidationPipe + `@Type(() => Number)` | يحوّل `page`/`limit` من نص إلى رقم (`QueryWorkoutDto`) |
| Controller | `src/modules/workout/workout.controller.ts` | `WorkoutController.findAll(queryDto)` |
| Service | `src/modules/workout/workout.service.ts` | `WorkoutService.findAll(queryDto)` |
| بناء استعلام مركّب | TypeORM | `createQueryBuilder('workout').leftJoinAndSelect(...).andWhere(...)` متسلسلة حسب الفلاتر المُرسَلة فقط |
| تنفيذ + عدّ | TypeORM | `getManyAndCount()` — استعلامان فعليًا: بيانات الصفحة + العدد الكلي |
| استجابة | — | `{data, meta:{page, limit, total, totalPages}}` |

**تفصيل مهم**: لاحظ أن كل شرط فلترة (`search`, `difficulty`, `segmentId`, `minDuration`...) يُضاف **فقط إن أُرسِل فعليًا** (`if (search) {...}`) — استعلام واحد مرن يتكيّف مع أي تركيبة من الفلاتر، بدل كتابة استعلام منفصل لكل احتمال.

---

# PART 30 — Why Was This Used?

> لكل تقنية/نمط مهم: ماذا؟ لماذا نحتاجه عمومًا؟ لماذا كان مفيدًا هنا تحديدًا؟ ما المشكلة التي يحلّها؟ ماذا بدونه؟ ما البدائل؟ ولماذا ربما اختاره المطوّر؟ حيث لا يمكن الجزم بالسبب، سنقول ذلك صراحة.

### NestJS نفسه (بدل Express خام أو framework آخر)

**ما المشكلة التي يحل؟** غياب بنية موحّدة وDI مدمج في Express الخام (Part 4). **بدونه؟** كل موديول كان سيُنظَّم بطريقة مختلفة، لا آلية موحّدة للـ Guards/Pipes/Filters، اختبار الوحدات أصعب بكثير بلا DI جاهز. **بدائل**: Express + بنية يدوية، Fastify (أسرع لكن أقل نضجًا في الأدوات)، Koa. **لماذا هنا؟** المشروع يحتاج تكاملات جاهزة كثيرة (ORM، Swagger، Microservices، Validation) — NestJS يوفرها كلها كحزم رسمية متوافقة مع بعضها.

### TypeORM (بدل Prisma أو استعلامات SQL خام)

**ما المشكلة التي يحل؟** كتابة SQL يدوي في كل مكان (عرضة لأخطاء وSQL Injection، Part 12). **بدونه؟** كل استعلام (`findOne`, `save`, الفلاتر المعقّدة) كان سيُكتب كنص SQL خام + معالجة يدوية للنتائج. **بدائل**: Prisma (نمط أحدث، type-safety أقوى لكن أقل مرونة في العلاقات المعقّدة)، Sequelize، Knex (query builder بلا ORM كامل). *السبب الحقيقي وراء اختيار TypeORM تحديدًا بدل Prisma لا يمكن تأكيده من الكود — لكن TypeORM هو التكامل "الرسمي" الأكثر نضجًا مع NestJS (`@nestjs/typeorm`)، وهذا سبب شائع كافٍ عمليًا.*

### JWT (بدل Sessions تقليدية)

**ما المشكلة التي يحل؟** تتبّع هوية المستخدم عبر طلبات متعددة بلا اتصال دائم. **لماذا مفيد هنا؟** الـ API يخدم على الأرجح تطبيق موبايل (Part 27) — JWT أنسب من Sessions المعتمدة على Cookies (أقل ملاءمة لبيئات الموبايل). **بدونه؟** إما Sessions (تحتاج تخزين حالة على السيرفر أو Redis)، أو إعادة إرسال بيانات الدخول مع كل طلب (غير عملي وغير آمن). **بدائل**: Session-based auth + Redis، OAuth كامل (لو احتجنا تسجيل دخول عبر أطراف ثالثة — غير مطلوب هنا).

### bcrypt (بدل SHA-256 عادي أو Argon2)

**ما المشكلة التي يحل؟** تخزين كلمات مرور بأمان (Part 14). **لماذا bcrypt تحديدًا؟** مصمَّم عمدًا ليكون بطيئًا وقابلاً لضبط "جولات" التعقيد، بخلاف دوال hash عامة سريعة (MD5/SHA) غير مناسبة لكلمات المرور إطلاقًا. **بدائل حديثة**: Argon2 (يُعتبر حاليًا الخيار "الأحدث" الموصى به في بعض الأدلة الأمنية) — *لا يمكن تأكيد سبب اختيار bcrypt تحديدًا بدل Argon2 من الكود، لكن bcrypt يبقى خيارًا آمنًا ومُثبَتًا جدًا في الصناعة.*

### RabbitMQ (بدل استدعاء SMTP مباشرة أو Redis Queue)

تفصيل كامل في Part 23/24 من `PROJECT_ANALYSIS.md`. **الملخص**: يفصل إرسال البريد البطيء عن استجابة HTTP. *لماذا RabbitMQ تحديدًا بدل بديل أخف (BullMQ+Redis) لغرض واحد ضيق كهذا — لا يمكن تأكيده من الكود. الأرجح: تفضيل الفريق أو معيار تنظيمي.*

### class-validator + class-transformer (بدل تحقق يدوي)

**ما المشكلة التي يحل؟** تحقق يدوي (`if (!email.includes('@')) throw ...`) متكرر، عرضة للنسيان، وصعب الصيانة. **بدونه؟** كل DTO كان سيحتاج دوال تحقق مكتوبة يدويًا بالكامل. **بدائل**: Zod، Joi (أكثر شيوعًا في مشاريع Express الخام؛ أقل تكاملاً مباشرًا مع Decorators بأسلوب NestJS).

### Guards منفصلة (`AuthGuard`+`RolesGuard`) بدل middleware واحد يفعل كل شيء

**ما المشكلة التي يحل؟** مسؤولية واحدة واضحة لكل حارس (Part 15/16) — يسهل اختبار كل واحد بمعزل، وتركيب/فصل المتطلبات لكل مسار بمرونة (بعض المسارات تحتاج مصادقة فقط، أخرى تحتاج دورًا محدَّدًا أيضًا). **بدونه؟** منطق واحد ضخم يتحقق من كل شيء دفعة واحدة، أصعب إعادة استخدام جزء منه فقط.

### Cloudinary (بدل تخزين محلي أو S3)

**ما المشكلة التي يحل؟** تخزين وسائط دائم، مُوزَّع، بروابط جاهزة (Part 22). **بدائل**: AWS S3 + CloudFront، تخزين محلي على قرص السيرفر (غير عملي للنشر متعدد النسخ). *لماذا Cloudinary تحديدًا بدل S3 — الأرجح: سهولة الإعداد (SDK بسيط، تحويلات صور/فيديو جاهزة) دون الحاجة لضبط بنية تحتية إضافية؛ لا تأكيد من الكود.*

### LangChain (بدل استدعاء Gemini API مباشرة)

**ما المشكلة التي يحل؟** بناء Prompt منظَّم مع تاريخ محادثة، بواجهة موحَّدة قابلة لاحقًا لتبديل مزوّد النموذج بأقل تعديل (Part 22). **بدونه؟** كود يدوي لتنسيق نص الـ prompt وسياق المحادثة مع كل استدعاء HTTP خام لـ Gemini API.

### Docker متعدد المراحل (بدل صورة واحدة بسيطة)

**ما المشكلة التي يحل؟** صورة إنتاجية صغيرة الحجم، بلا أدوات تطوير غير ضرورية (Part 26). **بدونه؟** صورة إنتاجية أثقل بكثير، تحمل TypeScript compiler وكل devDependencies (`jest`, `eslint`...) بلا داعٍ.

---

# PART 31 — Common Mistakes

> أخطاء شائعة جدًا لمطوّر يتعلّم NestJS من جديد — بعضها موجود **فعليًا** في هذا المشروع نفسه، مما يجعلها دروسًا حية وليست افتراضية.

### أخطاء متعلقة بـ Dependency Injection

- **نسيان `@Injectable()`** على كلاس تريد حقنه — NestJS يفشل عند الإقلاع برسالة "Nest can't resolve dependencies" غامضة أحيانًا للمبتدئ.
- **الخلط بين نوع الحقن العادي والتوكن المخصَّص**: محاولة `@Inject(SomeClass)` بدل الاعتماد على النوع فقط عندما لا حاجة لتوكن مخصَّص — يعمل، لكنه تكرار غير ضروري.
- **توقّع أن Providers تُبنى من جديد مع كل طلب**: الافتراضي Singleton (Part 8) — تعديل حالة داخلية (state) في Service بلا وعي بأنها **مشتركة** بين كل الطلبات هو مصدر أخطاء صعبة التتبّع.

### أخطاء متعلقة بـ Guards/Decorators (الأخطر، ولها مثال حقيقي في هذا المشروع)

- **الاعتقاد أن وجود Decorator يعني أن أثره فعّال** — أكبر درس من هذا الكتاب بأكمله. `@Roles()` بلا `RolesGuard` مربوط = بلا أي تأثير (Part 16، مثال `AiChatController` الحقيقي). `@Exclude()` بلا `ClassSerializerInterceptor` مربوط = بلا أي تأثير (Part 27، تسريب هاش كلمة المرور الحقيقي).
- **ترتيب خاطئ في `@UseGuards(...)`**: وضع Guard يعتمد على `request.user` **قبل** الحارس الذي يضعه فعليًا — راجع لماذا `AuthGuard` يجب أن يسبق `RolesGuard` دائمًا (Part 16).

### أخطاء متعلقة بـ DTOs/Validation

- **نسيان `transform: true`** في `ValidationPipe` ثم التساؤل "لماذا `page` لا يزال نصًا وليس رقمًا؟" رغم استخدام `@Type(() => Number)` بشكل صحيح (Part 10).
- **استخدام `Object.assign(entity, dto)` بدون `whitelist`/`forbidNonWhitelisted` مفعَّلَين** — فتح باب Mass Assignment كامل (Part 10).
- **جعل `UpdateDto` يرث من `Entity` مباشرة بدل DTO الإنشاء** — يخلط بين "شكل قاعدة البيانات" و"شكل ما يُسمح للعميل إرساله" (قد يحمل حقولاً حساسة مثل `id` أو `password` دون قصد).

### أخطاء متعلقة بقاعدة البيانات/TypeORM

- **الخلط بين `create()` و`save()`** (Part 12) — استدعاء `create()` فقط وتوقّع أن البيانات حُفظت.
- **الاعتماد على `synchronize: true` في الإنتاج** — خطر حقيقي (فقدان بيانات محتمل عند تعديل الـ Entities). هذا المشروع يتجنبه صراحة (Part 12)، لكنه فخ شائع جدًا للمبتدئين الذين ينسخون إعداد التطوير للإنتاج بلا تعديل.
- **تركيب استعلامات SQL بدمج نصي مباشر** (`` `WHERE x = '${value}'` ``) بدل parameters — يفتح SQL Injection. المشروع يتجنب هذا بالكامل (Part 12/27)، لكنه من أخطر الأخطاء الشائعة لمن يستخدم `createQueryBuilder` دون انتباه.

### أخطاء متعلقة بمعالجة الأخطاء

- **رمي `Error` عادي بدل `HttpException` فرعية** عندما تريد status code محدَّد — سيصل دائمًا كـ 500 عام (Part 20).
- **الاعتماد على try/catch محلي في كل مكان بدل الاستفادة من Exception Filter العام** — تكرار غير ضروري؛ القاعدة: اترك للـ Filter العام كل ما هو **عام**، وتعامل محليًا فقط مع أخطاء **تحتاج ترجمة خاصة** (كما فعل `AiChatService` مع فشل Gemini، Part 20/22).

### أخطاء متعلقة بالأمان (كلها لها مثال حقيقي هنا)

- **إعادة كيان قاعدة بيانات كاملاً كاستجابة API** بدل بناء كائن رد آمن صراحة، أو تفعيل `ClassSerializerInterceptor` فعليًا (Part 27).
- **تسجيل `ThrottlerModule` عالميًا وتوقّع أنه يحمي كل شيء تلقائيًا** — يحتاج ربطًا صريحًا (Part 16).
- **تحقق ملفات غير متّسق بين مسارات متشابهة** — نفس النمط التقني (`FileInterceptor`) بمستوى حماية مختلف بين موديولين (Part 23).

### أخطأ متعلقة بالمعمارية

- **حقن اعتماديات "احتياطًا" دون استخدامها فعليًا** — يزيد التعقيد بلا فائدة، ويربك أي قارئ لاحق يحاول فهم اعتماديات موديول معيّن (مثال حقيقي متكرر في هذا المشروع، Part 6/22).
- **وضع منطق عمل داخل Controller** "لأنه أسرع الآن" — يصعب اختباره لاحقًا ويكسر مبدأ الفصل (Part 9/11).

---

# PART 32 — From This Project to Any NestJS Project

> الهدف من هذا القسم: أن تستطيع فتح **أي** مشروع NestJS لم تره من قبل، وتبني له نفس الخريطة الذهنية التي بنيناها هنا لهذا المشروع، خلال دقائق وليس أيام.

### الترتيب الموصى به لقراءة أي مشروع NestJS جديد

```mermaid
flowchart TD
  A["1) افتح src/main.ts"] --> B["ما الـ Pipes/Filters/Interceptors العامة؟<br/>هل يوجد setGlobalPrefix؟ هل التطبيق hybrid (microservices)؟"]
  B --> C["2) اعثر على AppModule"]
  C --> D["اقرأ imports: هذه قائمة كل الميزات الموجودة في المشروع"]
  D --> E["3) افتح كل Feature Module"]
  E --> F["ما الذي يستورده؟ ما الذي يُصدِّره؟ (يكشف الاعتماديات الحقيقية بين الميزات)"]
  F --> G["4) افتح الـ Controllers"]
  G --> H["ما المسارات؟ ما الحراس المطبَّقة؟ من يُسمح له بالوصول؟"]
  H --> I["5) تتبّع كل Controller إلى Service الخاص به"]
  I --> J["أين تعيش قرارات العمل الفعلية؟"]
  J --> K["6) تتبّع كل Service إلى Repository/Entity"]
  K --> L["كيف تبدو قاعدة البيانات؟ ما العلاقات؟"]
  L --> M["7) اعثر على قاعدة البيانات: أين الاتصال مُعرَّف؟ (عادة AppModule)"]
  M --> N["8) اعثر على الـ Guards: كيف تعمل المصادقة؟ كيف يعمل التفويض؟"]
  N --> O["9) اعثر على Configuration: ما متغيرات البيئة المطلوبة؟"]
  O --> P["10) اعثر على أي خدمات خارجية: بحث عن 'axios' / SDKs / ClientProxy"]
```

### كيف تفكّر كمطوّر Backend عند فتح مشروع جديد لأول مرة

اسأل نفسك بهذا الترتيب تحديدًا (نفس الترتيب الذي استخدمناه فعليًا لتحليل هذا المشروع في `PROJECT_ANALYSIS.md`):

1. **ما هذا النظام؟ ما المشكلة التي يحلّها؟** (اقرأ README أولاً، ثم تحقق من الكود — لا تثق بالـ README وحده).
2. **من يستخدمه؟** (كم دورًا؟ ما الفرق بينها؟ ابحث عن enum الأدوار أو نظام صلاحيات).
3. **ما الميزات الرئيسية؟** (قائمة `imports` في `AppModule` تجيب هذا مباشرة، دون الحاجة لقراءة سطر كود آخر).
4. **كيف تتصل الميزات ببعضها؟** (استيراد مباشر؟ رسائل غير متزامنة؟ أحداث؟).
5. **كيف تتحرك البيانات؟** (Controller → Service → Repository — تحقق أن هذا النمط مُتَّبع فعلاً، أو مختلف).
6. **كيف تعمل المصادقة؟** (JWT؟ Sessions؟ OAuth؟ أين الحارس المسؤول؟).
7. **أين منطق العمل؟** (يجب أن يكون في Services دائمًا تقريبًا — إن وجدته منتشرًا في Controllers، هذا مؤشر جودة كود ضعيف).
8. **كيف تصل البيانات لقاعدة البيانات؟** (ORM؟ أيه واحد؟ Migrations موجودة؟).
9. **كيف تُعالَج الأخطاء؟** (Exception Filter عام؟ أم كل مكان يتعامل بطريقته؟).
10. **كيف يُنشَر النظام؟** (Docker؟ كيف تبدو بيئة الإنتاج مقارنة بالتطوير؟).

### علامات تحذيرية تستحق الانتباه فورًا في أي مشروع جديد (تعلّمناها من ثغرات هذا المشروع الحقيقية)

- Decorator (`@Roles`, `@Exclude`, أي Custom Decorator) بلا تحقق من وجود الطرف الآخر الذي "يقرأه" فعليًا (Guard/Interceptor مربوط).
- استجابات API تُعيد Entity كاملاً مباشرة بدل DTO/كائن رد مبني صراحةً.
- `ThrottlerModule`/أي إعداد "عام" مسجَّل، لكن بلا تحقق من ربطه فعليًا كـ Guard/Interceptor نشط.
- تناقض واضح بين مسارات متشابهة (تحقق ملف في مكان، غيابه في مكان مشابه).
- سكربتات (`npm run test:e2e` مثلاً) تشير لملفات/مجلدات غير موجودة فعليًا.

---

# PART 33 — How To Build This Project From Scratch

> بدون نسخ الكود — تصوّر هندسي لكيف كنا سنبني هذا النظام لو لم يكن موجودًا، بنفس ترتيب قرارات أي مشروع Backend حقيقي.

```mermaid
flowchart TD
  A[Requirements] --> B[Architecture]
  B --> C["Database Design"]
  C --> D[Modules]
  D --> E[APIs]
  E --> F[Authentication]
  F --> G[Authorization]
  G --> H["Business Logic"]
  H --> I[Testing]
  I --> J[Docker]
  J --> K[Deployment]
```

### 1) Requirements

*ماذا أفعل؟* أحدد **بوضوح** من يستخدم النظام (هنا: مستخدم عادي + مدير محتوى) وما الميزات الأساسية (هوية، onboarding، كتالوج تمارين/أطعمة، مساعد AI). *لماذا؟* بلا هذا، كل قرار لاحق (تصميم قاعدة بيانات، الأدوار) يكون تخمينًا. *ما الذي أحتاج معرفته؟* الفرق الدقيق بين ما يحتاجه كل دور — هذا يحدد لاحقًا كل `@Roles()` في النظام.

### 2) Architecture

*ماذا أفعل؟* أقرر: Monolith واحد أم Microservices فعلية منفصلة؟ (هنا: Modular Monolith + استثناء واحد هجين للبريد — قرار معقول لحجم فريق/مشروع متوسط، Part 6). *لماذا؟* Microservices فعلية تضيف تعقيد نشر/تنسيق كبيرًا لا يستحقه مشروع بهذا الحجم بعد. *ما الذي أحتاج معرفته؟* الفرق بين "تقسيم منطقي داخل عملية واحدة" (Modules) و"تقسيم فعلي لعمليات/نُشر منفصلة" (Microservices حقيقية).

### 3) Database Design

*ماذا أفعل؟* أرسم الكيانات والعلاقات **قبل** كتابة أي كود (Part 8 في `PROJECT_ANALYSIS.md` هو بالضبط هذا الرسم، مُستخرَجًا بعد بناء النظام — في مشروع من الصفر، يُرسَم **قبل**). *لماذا؟* تعديل بنية قاعدة بيانات بعد إدخال بيانات حقيقية أصعب بكثير من تعديل مخطط على الورق. *ما الذي أحتاج معرفته؟* أنواع العلاقات (Part 12)، ومتى نحتاج `CASCADE`، ومتى نحتاج جدولاً منفصلاً بدل عمود إضافي (مثال: `category_segment_stats`، Part 12).

### 4) Modules

*ماذا أفعل؟* أقسّم حسب الميزة (Part 6/7) — قائمة أولية: Auth, Users, Category tree, Workout, Food, AiChat, Mail. *لماذا؟* حدود واضحة = فريق يعمل بالتوازي بلا تصادم، وقابلية فصل لاحقة لو احتجنا microservice حقيقية لميزة معيّنة.

### 5) APIs

*ماذا أفعل؟* أصمّم المسارات باتباع REST (Part 1) — مورد واحد لكل موديول، فعل عبر HTTP Method. *لماذا؟* اتساق يسهّل على أي مستهلك (تطبيق موبايل) تعلّم نمط الـ API بسرعة.

### 6) Authentication

*ماذا أفعل؟* أقرر آلية الهوية (Part 14) — JWT هنا، لأن العميل الأساسي تطبيق موبايل بلا حاجة لـ Cookies. *ما الذي أحتاج معرفته؟* الفرق بين access/refresh، ولماذا أسرار منفصلة، وأين يُخزَّن ماذا.

### 7) Authorization

*ماذا أفعل؟* أحدد نموذج الأدوار (بسيط هنا: دوران فقط) وأبني Guard مخصَّصًا يقرأ metadata من decorator (Part 15/16). *الدرس الأهم من هذا المشروع تحديدًا*: تأكد أن كل Guard **مربوط فعليًا** على كل مسار يحتاجه — هذا أسهل خطوة للنسيان.

### 8) Business Logic

*ماذا أفعل؟* أكتب كل قرار عمل داخل Services فقط (Part 11)، Controllers نحيفة دائمًا. *ما الذي أحتاج معرفته؟* أي قاعدة عمل تحتاج **تحققًا سابقًا** (وجود علاقة، تفرّد اسم) يجب أن تُكتَب صراحة في الـ Service **قبل** الاعتماد على قاعدة البيانات لترفضها (Part 20، رسائل خطأ أوضح).

### 9) Testing

*ماذا أفعل؟* أكتب اختبارات وحدة لكل Service حرج (خصوصًا Auth) منذ البداية، مستفيدًا من DI لتزييف كل اعتمادية (Part 8/25). *لماذا الآن وليس لاحقًا؟* كلما تأخر كتابة الاختبارات، كلما زاد "الدَّين" غير المُختبَر (هذا المشروع نفسه مثال: `RolesGuard` بلا اختبار، وهو تحديدًا مصدر إحدى ثغراته).

### 10) Docker

*ماذا أفعل؟* بناء متعدد المراحل (Part 26) — صورة تطوير خفيفة، صورة إنتاج أخف وأصغر.

### 11) Deployment

*ماذا أفعل؟* `docker-compose` لكل بيئة، مع healthchecks حقيقية (Part 26)، وإضافة CI/CD (غير موجود حاليًا في هذا المشروع — أول شيء أضيفه لو أكمل هذا المشروع من هنا).

---

# PART 34 — Knowledge Map

> كل ما تعلمناه، في خريطة واحدة، مبنية على مفاهيم **هذا المشروع تحديدًا** بترتيب اعتمادها المنطقي.

```mermaid
flowchart TD
  HTTP["HTTP: Request/Response, Methods, Status Codes<br/>(Part 1)"] --> Node["Node.js: Event Loop, async/await, npm<br/>(Part 3)"]
  Node --> TS["TypeScript: Types, Classes, Decorators, Generics<br/>(Part 2)"]
  TS --> Nest["NestJS Fundamentals: Modules, Controllers, Providers<br/>(Part 4)"]
  Nest --> Mods["Modules & Architecture<br/>(Part 6-7)"]
  Mods --> DI["Dependency Injection<br/>(Part 8)"]
  DI --> Ctrl["Controllers<br/>(Part 9)"]
  Ctrl --> DTO["DTOs & Validation<br/>(Part 10)"]
  DTO --> Svc["Services & Business Logic<br/>(Part 11)"]
  Svc --> DB["Database: Entities, Relations, TypeORM<br/>(Part 12-13)"]
  DB --> Auth["Authentication: JWT, bcrypt<br/>(Part 14)"]
  Auth --> Authz["Authorization: Roles, Guards<br/>(Part 15-16)"]
  Authz --> Pipes["Pipes<br/>(Part 17)"]
  Pipes --> Interc["Interceptors (مفهوم + درس عملي عن التفعيل الناقص)<br/>(Part 18)"]
  Interc --> MW["Middleware (المفهوم، رغم غيابه من المشروع)<br/>(Part 19)"]
  MW --> Exc["Exception Handling<br/>(Part 20)"]
  Exc --> Cfg["Configuration<br/>(Part 21)"]
  Cfg --> Ext["External Services: Cloudinary, RabbitMQ, Gemini<br/>(Part 22-24)"]
  Ext --> Test["Testing<br/>(Part 25)"]
  Test --> Docker["Docker & Deployment<br/>(Part 26)"]
  Docker --> Sec["Security: تجميع كل ما سبق من زاوية أمنية<br/>(Part 27)"]
  Sec --> Flows["Feature Flows الكاملة<br/>(Part 28-29)"]
  Flows --> Mastery["إتقان: القدرة على قراءة/بناء أي مشروع NestJS<br/>(Part 32-33)"]
```

**كيف تستخدم هذه الخريطة عمليًا**: لو نسيت مفهومًا لاحقًا، اسأل نفسك "أين يقع في هذه السلسلة؟" — كل مفهوم يعتمد على ما قبله مباشرة. لو شعرت بالضياع في `Guards` مثلاً، ارجع أولاً للتأكد من فهمك لـ `Dependency Injection` (لأن كل Guard هو `@Injectable()` يخضع لنفس قواعد DI).

---

# PART 35 — Final Cheat Sheet

> مرجع سريع للمراجعة فقط — ليس للتعلّم. إن شعرت أن سطرًا هنا غير واضح، ارجع لِـ Part المذكور بين قوسين.

### NestJS — اللبنات الأساسية

| المصطلح | تعريف سطر واحد |
|---|---|
| **Module** (`@Module()`) | يجمع Controllers+Providers لميزة واحدة (Part 4) |
| **Controller** (`@Controller()`) | يستقبل HTTP، يفوّض لـ Service (Part 9) |
| **Provider** | أي كلاس `@Injectable()` قابل للحقن (Part 8) |
| **Service** | Provider يحمل منطق العمل (اصطلاح، ليس نوعًا خاصًا) (Part 11) |
| **Guard** (`CanActivate`) | يقرر سماح/رفض **قبل** الـ Handler (Part 16) |
| **Pipe** (`PipeTransform`) | يحوّل/يتحقق من معامل واحد داخل (Part 17) |
| **Interceptor** (`NestInterceptor`) | يغلّف التنفيذ (قبل+بعد)، يعدّل الاستجابة (Part 18) |
| **Middleware** | يعمل أول شيء، قبل تحديد أي Route (Part 19) — غير مستخدَم هنا |
| **Filter** (`ExceptionFilter`, `@Catch()`) | يوحّد شكل الأخطاء الخارجة (Part 20) |

### HTTP

| Method | يعني |
|---|---|
| `GET` | اقرأ (بلا تعديل) |
| `POST` | أنشئ |
| `PATCH` | عدّل جزئيًا |
| `PUT` | استبدل كليًا *(غير مستخدَم في هذا المشروع)* |
| `DELETE` | احذف |

| النطاق | يعني |
|---|---|
| `2xx` | نجاح |
| `4xx` | خطأ من العميل (400 بيانات خاطئة، 401 غير مصادَق، 403 ممنوع، 404 غير موجود، 409 تعارض) |
| `5xx` | خطأ من السيرفر |

### Database

| المصطلح | يعني |
|---|---|
| **Entity** | كلاس = جدول (Part 12) |
| **Repository** | الكائن الذي نستعلم/نحفظ به فعليًا (`find`, `save`, `create`, ...) (Part 12) |
| **Relation** | `@OneToMany` / `@ManyToOne` / `@OneToOne` — لا `@ManyToMany` في هذا المشروع (Part 12) |
| **Transaction** | مجموعة عمليات تنجح أو تفشل كوحدة واحدة (Part 12) |
| **`create()` مقابل `save()`** | `create` = في الذاكرة فقط، `save` = كتابة فعلية (Part 12) |

### Authentication

| المصطلح | في هذا المشروع |
|---|---|
| Password hashing | bcrypt، 10 جولات، في كل مكان (Part 14) |
| Access token | JWT، 15 دقيقة، سرّ `JWT_ACCESS_SECRET` (Part 14) |
| Refresh token | JWT، 7 أيام، هاش واحد مخزَّن بالمستخدم (Part 14) |
| من يتحقق من التوكن | `AuthGuard` — يُعيد تحميل المستخدم من القاعدة كل مرة (Part 14/16) |
| من يتحقق من الدور | `RolesGuard` — يقرأ `@Roles()` عبر `Reflector` (Part 15/16) |

### أهم 5 دروس من هذا المشروع (تستحق أن تُحفَظ فوق كل التفاصيل)

1. **Decorator بلا الطرف الذي "يقرأه ويفعّله" = بلا أي أثر وظيفي.** (مثالان حقيقيان: `@Roles()` بلا `RolesGuard` في `ai-chat`، و`@Exclude()` بلا `ClassSerializerInterceptor` على `UserEntity.password`.)
2. **Controller نحيف دائمًا؛ كل قرار عمل في Service.**
3. **DTO + `whitelist`/`forbidNonWhitelisted` = خط الدفاع الأول ضد بيانات غير متوقَّعة.**
4. **الاتساق أهم من "الحل الأذكى" في مكان واحد** — نفس نمط تحقق الملفات كان يجب أن يُطبَّق في كل مكان يرفع ملفات، لا في مكان واحد فقط.
5. **الأمان يعيش في التفاصيل الصغيرة**: رسالة خطأ موحّدة أو مختلفة، ترتيب Guards، وجود Interceptor مربوط أم لا — كلها قرارات صغيرة، وأثرها كبير جدًا.

---

*نهاية الكتاب. للعودة لأي مفهوم، استخدم [Table of Contents](#table-of-contents) في الأعلى. المرجع المصاحب: [`docs/PROJECT_ANALYSIS.md`](./PROJECT_ANALYSIS.md).*
