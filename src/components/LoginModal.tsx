import type {User} from '@/types/user'

import {config} from '@/../config'
import OAuthLoginModal from '@/components/OAuthLoginModal'
import PATLoginModal from '@/components/PATLoginModal'

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
