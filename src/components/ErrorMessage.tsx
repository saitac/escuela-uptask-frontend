import { PropsWithChildren } from "react"

const ErrorMessage = ({children}: PropsWithChildren) => {
    return(
        <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
        >
            <span
                className="font-medium"
            >Error!{" "}</span>
            {children}
        </div>
    )
}

export default ErrorMessage