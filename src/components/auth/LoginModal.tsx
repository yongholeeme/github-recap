import {config} from '@config'

import type {User} from '@/types/user'

import OAuthLoginModal from '@/components/auth/OAuthLoginModal'
import PATLoginModal from '@/components/auth/PATLoginModal'

interface LoginModalProps {
    isOpen: boolean
    onClose: () => void
    onLogin: (user: User) => void
}

export default function LoginModal(props: LoginModalProps) {
    if (config.auth.method === 'pat') {
        return <PATLoginModal {...props} />
    }
    return <OAuthLoginModal {...props} />
}
