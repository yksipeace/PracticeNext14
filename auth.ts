import NextAuth from "next-auth"
import { authConfig } from "@/auth.config"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import { sql } from "@vercel/postgres"
import type { User } from "@/app/lib/definitions"
import bcrypt from "bcrypt"

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`
    return user.rows[0]
  } catch (error) {
    console.error("Failed to fetch user:", error)
    throw new Error("Failed to fetch user.")
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        // Zodによるバリデーション
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials)

        // バリデーションOKの場合
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          // User情報取得
          const user = await getUser(email)
          // エラーハンドリング
          if (!user) return null
          // ハッシュ化された固定長の文字列を直して一致するかどうか確認
          const passwordsMatch = await bcrypt.compare(password, user.password)
          // 一致する場合はuserデータを返す
          if (passwordsMatch) return user
        }

        // 全て当てはまらない場合、エラー返却
        console.log("Invalid credentials")
        return null
      },
    }),
  ],
})
