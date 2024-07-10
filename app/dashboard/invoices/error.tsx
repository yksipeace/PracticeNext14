'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  )
}

/**
 * # Error Type (Error オブジェクト)
 * 
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
 * 
 *  - EvalError
 * 
 *    グローバル関数に関して発生したエラー
 * 
 *  - RangeError
 * 
 *    数値変数またはパラメータが有効範囲外にある場合に発生するエラー
 * 
 *  - ReferenceError
 * 
 *    無効な参照を逆参照するときに発生するエラー
 * 
 *  - SyntaxError
 * 
 *    構文エラー
 * 
 *  - TypeError
 * 
 *    変数またはパラメータが有効な方でない場合に発生するエラー
 * 
 *  - URIError
 * 
 *    無効なパラメータが渡されたときに発生するエラー
 * 
 *  - AggregateError
 * 
 *    操作によって複数のエラーを報告する必要がある場合、
 * 
 *  - Internal Error
 * 
 *    Javascriptエンジンで内部エラーがスローされたときに発生するエラー
 */

/**
 * 引数のresetについて
 * 
 * これはエラー境界をリセットする関数。実行すると、この関数はルートセグメントの際レンダリングを試みます。
 */