# UTS Backend Programming

## Theme: Social Media (Text-Based)

Kami menggunakan X (Twitter) sebagai references endpoint dan logic. Seperti likes, tweets, notifications, usage, repost, and many more yang dibuat menggunakan Node.js, Express.js, MongoDB, JWT Authentication.

# Project Details

**Catatan:** Semua endpoint berjalan di `http://localhost:PORT/api/...` sesuai port yang ada di `.env` local masing masing.

Sebelum mengakses features yang telah dibangun, pertama - tama kita akan membuat akun melalui endpoint users **(POST /users)**. Dimana **body (JSON):** harus diisi/diinput dengan:

```json
{
  "email": " ", // Ini diisi sesuai dengan email user.
  "password": " ", // Buat password kamu lalu confirm dibawahnya.
  "username": " ", // Ini diisi sesuai dengan nama user.
  "confirm_password": " "
}
```

Setelah itu, untuk menjaga keamanan akun pengguna endpoints. User diminta untuk meng generate kode token yang dihasilkan oleh endpoint **(POST /auth/login)** agar dapat mengakses features dari project yang sedang dibangun. User di haruskan untuk mengisi **body (JSON):** dengan:

```json
{
  "email": " ", // Email yang digunakan pada saat pendaftaran akun
  "password": " " // Password yang digunakan pada saat pendaftaran.
}
```

Setelah menerima kode token, token tersebut perlu di copy dan diisi pada bagian **Headers** dengan **Key: Authorization && Value: jwt KODE_TOKEN**

_Berikut adalah list of features & Endpoints yang dimiliki di project ini_

---

### 👤 Users

| Method | Endpoint                             | Auth  | Deskripsi         |
| ------ | ------------------------------------ | ----- | ----------------- |
| GET    | `/api/users`                         | Tidak | Ambil semua user  |
| POST   | `/api/users`                         | Tidak | Buat akun baru    |
| GET    | `/api/users/:userId`                 | Tidak | Ambil detail user |
| PUT    | `/api/users/:userId`                 | Tidak | Update data user  |
| PUT    | `/api/users/:userId/change-password` | Tidak | Ganti password    |
| DELETE | `/api/users/:userId`                 | Tidak | Hapus user        |

**Buat User Baru - Request Body:**

```json
{
  "email": "kamu@email.com",
  "username": "usernamekamu",
  "password": "min8karakter",
  "confirm_password": "min8karakter"
}
```

**Buat User Baru - Response:**

```json
{
  "message": "User created successfully",
  "userId": "abc123"
}
```

---

### Tweets

| Method | Endpoint                      | Auth | Deskripsi                             |
| ------ | ----------------------------- | ---- | ------------------------------------- |
| POST   | `/api/tweets`                 | Ya   | Buat tweet baru                       |
| GET    | `/api/tweets/:id`             | Ya   | Ambil tweet berdasarkan ID            |
| DELETE | `/api/tweets/:id`             | Ya   | Hapus tweet milik sendiri             |
| GET    | `/api/tweets/search/recent`   | Ya   | Cari tweet terbaru                    |
| GET    | `/api/tweets/user/:id/tweets` | Ya   | Ambil semua tweet milik user tertentu |

**Buat Tweet - Request Body:**

```json
{
  "text": "Ini isi tweet saya!"
}
```

**Buat Tweet - Response:**

```json
{
  "tweetId": "xyz789",
  "userId": "abc123",
  "username": "usernamekamu",
  "text": "Ini isi tweet saya!",
  "createdAt": "2026-04-15T..."
}
```

---

### Comments

| Method | Endpoint                         | Auth  | Deskripsi                     |
| ------ | -------------------------------- | ----- | ----------------------------- |
| POST   | `/api/tweets/:id/comments`       | Ya    | Buat komentar pada tweet      |
| GET    | `/api/tweets/:id/comments`       | Tidak | Ambil semua komentar tweet    |
| GET    | `/api/tweets/:id/comments/count` | Tidak | Hitung total komentar tweet   |
| GET    | `/api/comments/:id`              | Tidak | Ambil komentar berdasarkan ID |
| PUT    | `/api/comments/:id`              | Ya    | Edit komentar milik sendiri   |
| DELETE | `/api/comments/:id`              | Ya    | Hapus komentar milik sendiri  |
| POST   | `/api/comments/:id/replies`      | Ya    | Balas komentar                |
| GET    | `/api/comments/:id/replies`      | Tidak | Ambil semua balasan komentar  |

**Buat Komentar - Request Body:**

```json
{
  "content": "Ini komentar saya!",
  "tweetOwnerId": "userId_pemilik_tweet"
}
```

**Balas Komentar - Request Body:**

```json
{
  "content": "Ini balasan komentar saya!"
}
```

---

### Likes

| Method | Endpoint                     | Auth  | Deskripsi                              |
| ------ | ---------------------------- | ----- | -------------------------------------- |
| POST   | `/api/likes/:tweetId`        | Ya    | Like sebuah tweet                      |
| DELETE | `/api/likes/:tweetId`        | Ya    | Unlike tweet                           |
| GET    | `/api/likes/tweets/:tweetId` | Tidak | Lihat siapa saja yang like tweet       |
| GET    | `/api/likes/users/:userId`   | Tidak | Lihat tweet yang di-like user tertentu |

---

### Dislikes

| Method | Endpoint                        | Auth  | Deskripsi                                 |
| ------ | ------------------------------- | ----- | ----------------------------------------- |
| POST   | `/api/dislikes/:tweetId`        | Ya    | Dislike sebuah tweet                      |
| DELETE | `/api/dislikes/:tweetId`        | Ya    | Hapus dislike dari tweet                  |
| GET    | `/api/dislikes/tweets/:tweetId` | Tidak | Lihat siapa saja yang dislike tweet       |
| GET    | `/api/dislikes/users/:userId`   | Tidak | Lihat tweet yang di-dislike user tertentu |

---

### Repost

| Method | Endpoint               | Auth  | Deskripsi                              |
| ------ | ---------------------- | ----- | -------------------------------------- |
| POST   | `/api/repost/:tweetId` | Ya    | Repost sebuah tweet                    |
| DELETE | `/api/repost/:tweetId` | Ya    | Batalkan repost                        |
| GET    | `/api/repost/:tweetId` | Tidak | Lihat siapa saja yang repost tweet ini |

---

### Follows

| Method | Endpoint               | Auth  | Deskripsi                   |
| ------ | ---------------------- | ----- | --------------------------- |
| POST   | `/api/follows/:userId` | Ya    | Follow user                 |
| DELETE | `/api/follows/:userId` | Ya    | Unfollow user               |
| GET    | `/api/follows/:userId` | Tidak | Lihat daftar followers user |

---

### Block

| Method | Endpoint                     | Auth | Deskripsi                               |
| ------ | ---------------------------- | ---- | --------------------------------------- |
| POST   | `/api/blocks/:userId`        | Ya   | Block user                              |
| DELETE | `/api/blocks/:userId`        | Ya   | Unblock user                            |
| GET    | `/api/blocks`                | Ya   | Lihat daftar user yang kamu block       |
| GET    | `/api/blocks/status/:userId` | Ya   | Cek apakah user tertentu sudah di-block |
| GET    | `/api/blocks/count/me`       | Ya   | Hitung total user yang kamu block       |

---

### Mute

| Method | Endpoint                    | Auth | Deskripsi                              |
| ------ | --------------------------- | ---- | -------------------------------------- |
| POST   | `/api/mutes/:userId`        | Ya   | Mute user                              |
| DELETE | `/api/mutes/:userId`        | Ya   | Unmute user                            |
| GET    | `/api/mutes`                | Ya   | Lihat daftar user yang kamu mute       |
| GET    | `/api/mutes/status/:userId` | Ya   | Cek apakah user tertentu sudah di-mute |
| GET    | `/api/mutes/count/me`       | Ya   | Hitung total user yang kamu mute       |

---

### Bookmarks

| Method | Endpoint                                   | Auth | Deskripsi                          |
| ------ | ------------------------------------------ | ---- | ---------------------------------- |
| POST   | `/api/users/:id/bookmarks`                 | Ya   | Tambah bookmark tweet              |
| GET    | `/api/users/:id/bookmarks`                 | Ya   | Lihat semua bookmark               |
| GET    | `/api/users/:id/bookmarks/check/:tweet_id` | Ya   | Cek apakah tweet sudah di-bookmark |
| GET    | `/api/users/:id/bookmarks/count`           | Ya   | Hitung total bookmark              |
| DELETE | `/api/users/:id/bookmarks/:tweet_id`       | Ya   | Hapus satu bookmark                |
| DELETE | `/api/users/:id/bookmarks`                 | Ya   | Hapus semua bookmark               |

**Tambah Bookmark - Request Body:**

```json
{
  "tweetId": "id_tweet_yang_mau_di-bookmark"
}
```

**Catatan:** `:id` pada URL bookmark adalah `userId` pemilik bookmark (harus sama dengan user yang sedang login).

---

### Notifications

| Method | Endpoint                                      | Auth | Deskripsi                           |
| ------ | --------------------------------------------- | ---- | ----------------------------------- |
| GET    | `/api/users/:id/notifications`                | Ya   | Ambil semua notifikasi user         |
| GET    | `/api/users/:id/notifications/unread`         | Ya   | Hitung notifikasi yang belum dibaca |
| POST   | `/api/users/:id/notifications`                | Ya   | Buat notifikasi baru                |
| PUT    | `/api/users/:id/notifications/:notif_id/read` | Ya   | Tandai notifikasi sudah dibaca      |
| DELETE | `/api/users/:id/notifications/:notif_id`      | Ya   | Hapus notifikasi                    |

**Buat Notifikasi - Request Body:**

```json
{
  "actorId": "userId_yang_melakukan_aksi",
  "type": "like",
  "tweetId": "id_tweet_jika_ada"
}
```

**Catatan:** `type` yang valid adalah: `like`, `follow`, `comment`, `repost`. Filter notifikasi bisa pakai query param: `/notifications?type=like` atau `/notifications?status=unread`

---

### Messages

| Method | Endpoint                     | Auth | Deskripsi                             |
| ------ | ---------------------------- | ---- | ------------------------------------- |
| POST   | `/api/messages`              | Ya   | Kirim pesan ke user lain              |
| GET    | `/api/messages/inbox`        | Ya   | Lihat inbox (daftar percakapan)       |
| GET    | `/api/messages/chat/:userId` | Ya   | Lihat percakapan dengan user tertentu |
| PUT    | `/api/messages/:messageId`   | Ya   | Edit pesan yang sudah dikirim         |
| DELETE | `/api/messages/:messageId`   | Ya   | Hapus pesan                           |

**Kirim Pesan - Request Body:**

```json
{
  "receiverId": "userId_penerima",
  "text": "Halo, apa kabar?"
}
```

---

### Community

| Method | Endpoint                     | Auth  | Deskripsi               |
| ------ | ---------------------------- | ----- | ----------------------- |
| GET    | `/api/community`             | Tidak | Ambil semua community   |
| GET    | `/api/community/:id`         | Tidak | Ambil detail community  |
| GET    | `/api/community/:id/members` | Tidak | Lihat anggota community |
| POST   | `/api/community`             | Ya    | Buat community baru     |
| POST   | `/api/community/:id/join`    | Ya    | Bergabung ke community  |
| POST   | `/api/community/:id/leave`   | Ya    | Keluar dari community   |
| PUT    | `/api/community/:id`         | Ya    | Update data community   |
| DELETE | `/api/community/:id`         | Ya    | Hapus community         |

**Buat Community - Request Body:**

```json
{
  "name": "Nama Community",
  "description": "Deskripsi community",
  "isPrivate": false
}
```

---

### Trending

| Method | Endpoint        | Auth  | Deskripsi                          |
| ------ | --------------- | ----- | ---------------------------------- |
| GET    | `/api/trending` | Tidak | Lihat hashtag yang sedang trending |

---

### Profiles

| Method | Endpoint                | Auth | Deskripsi                          |
| ------ | ----------------------- | ---- | ---------------------------------- |
| GET    | `/api/profiles/:userId` | Ya   | Lihat profil lengkap user tertentu |

---

### Usage (API Logs)

| Method | Endpoint             | Auth  | Deskripsi                               |
| ------ | -------------------- | ----- | --------------------------------------- |
| GET    | `/api/usage`         | Tidak | Lihat semua log request API             |
| GET    | `/api/usage/summary` | Tidak | Lihat ringkasan penggunaan per endpoint |

**Catatan** Filter log bisa pakai query param: `/usage?method=POST&endpoint=/api/tweets&page=1&limit=50`

---

## Contoh Flow Penggunaan

Berikut adalah contoh penggunaan dalam mencoba API ini

1. **Buat akun** → `POST /api/users`
2. **Login** → `POST /api/auth/login` → copy token yang didapat
3. **Buat tweet** → `POST /api/tweets` (token required)
4. **Like tweet** → `POST /api/likes/:tweetId` (token required)
5. **Komen tweet** → `POST /api/tweets/:id/comments` (token required)
6. **Follow user lain** → `POST /api/follows/:userId` (token required)
7. **Cek notifikasi** → `GET /api/users/:id/notifications` (token required)

### Creators

## **Kelompok 5 (Class B):**

---

| Name                    | NIM       | Github Profiles     |
| ----------------------- | --------- | ------------------- |
| Sherly Tamara           | 535250068 | SherlyTamaraa       |
| Lucio Aurey Feliciano   | 535250085 | lucioaureyfeliciano |
| Claudia Linetta Widjaja | 535250098 | claudialinetta      |
| Neizar Apriansyah       | 535250101 | neizarapriansyah    |
| FAKHZUL RAFLI S         | 535250102 | fakhzulraflis       |

---

**This API project was developed all together by the people above**
