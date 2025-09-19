import { cva } from 'class-variance-authority';
import { Trash2, BookCheck, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

// サイドメニューを定義
const sideMenu = [
    {
        path: "/",
        label: "タスク一覧",
        icon: <BookCheck />,
    },
    {
        path: "/trash",
        label: "ゴミ箱",
        icon: <Trash2 />,
    }
]

// メニューリンクのスタイル、バリエーションを定義
const linkVariants = cva("flex items-center gap-2 rounded px-5 py-3", {
    variants: {
        active: {
            true: "bg-blue-400 text-white",
            false: "hover:bg-slate-100",
        }
    }
})

export function AppLayout({ children }) {
    const { pathname } = useLocation(); // 現在の URL パスを取得

    return (
        <div className='relative flex flex-col md:flex-row min-h-screen font-sans antialiased'>
            <div className='flex min-w-64 flex-col gap-5 p-6'>
                <h1 className='text-3xl'>Todoリスト</h1>
                <nav>
                    <ul className='flex flex-col gap-2'>
                        {sideMenu.map(({ path, label, icon }) => (
                            <li>
                                <Link
                                    to={path}
                                    className={linkVariants({ active: pathname === path })}
                                    // navigation[x].path と 現在の URL パスを比較してアクティブ表示を切り替える
                                >
                                    {icon}
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <main className='mx-auto h-screen flex-1 overflow-y-auto overscroll-none bg-slate-100'>
                {children}
            </main>
        </div>
    )
}