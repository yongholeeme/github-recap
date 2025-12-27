export interface ShareData {
    year: number
    userName: string
    avatarUrl: string
    commits: number
    prsCreated: number
    prsMerged: number
    prsReviewed: number
    issuesParticipated: number
    mentions: number
    developerType: string
    developerTypeEmoji: string
    monthlyCommits: number[] // 12 months of commit counts
    // i18n labels
    labels: {
        commits: string
        prsCreated: string
        prsMerged: string
        reviews: string
        issues: string
        mentions: string
    }
}

// Square format for better social sharing
const CARD_WIDTH = 1200
const CARD_HEIGHT = 1200

// Grid settings
const PADDING = 32
const GAP = 12
const GRID_COLS = 4
const GRID_ROWS = 4
const CELL_WIDTH = (CARD_WIDTH - PADDING * 2 - GAP * (GRID_COLS - 1)) / GRID_COLS
const CELL_HEIGHT = (CARD_HEIGHT - PADDING * 2 - GAP * (GRID_ROWS - 1)) / GRID_ROWS

// Developer type key based on patterns
type DeveloperTypeKey = 'nightOwl' | 'earlyBird' | 'weekendWarrior' | 'codeGuardian' | 'commitMachine' | 'developer'

export function getDeveloperType(
    peakHour: number,
    peakDayIndex: number,
    commits: number,
    prsReviewed: number
): {typeKey: DeveloperTypeKey; emoji: string} {
    if (peakHour >= 22 || peakHour <= 4) {
        return {typeKey: 'nightOwl', emoji: '🦉'}
    }
    if (peakHour >= 5 && peakHour <= 8) {
        return {typeKey: 'earlyBird', emoji: '🐦'}
    }
    // 0 = Sunday, 6 = Saturday
    if (peakDayIndex === 0 || peakDayIndex === 6) {
        return {typeKey: 'weekendWarrior', emoji: '⚔️'}
    }
    if (prsReviewed > commits / 10 && prsReviewed > 50) {
        return {typeKey: 'codeGuardian', emoji: '🛡️'}
    }
    if (commits > 1000) {
        return {typeKey: 'commitMachine', emoji: '🤖'}
    }
    return {typeKey: 'developer', emoji: '💻'}
}

async function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = src
    })
}

function formatNumber(num: number): string {
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
    }
    return num.toLocaleString()
}

function drawRoundedRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
) {
    ctx.beginPath()
    ctx.moveTo(x + radius, y)
    ctx.lineTo(x + width - radius, y)
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
    ctx.lineTo(x + width, y + height - radius)
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
    ctx.lineTo(x + radius, y + height)
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
    ctx.lineTo(x, y + radius)
    ctx.quadraticCurveTo(x, y, x + radius, y)
    ctx.closePath()
}

function getCell(col: number, row: number, colSpan = 1, rowSpan = 1) {
    return {
        x: PADDING + col * (CELL_WIDTH + GAP),
        y: PADDING + row * (CELL_HEIGHT + GAP),
        width: CELL_WIDTH * colSpan + GAP * (colSpan - 1),
        height: CELL_HEIGHT * rowSpan + GAP * (rowSpan - 1),
    }
}

function drawCard(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    options?: {
        gradient?: [string, string]
        borderColor?: string
        glow?: string
        glowIntensity?: number
    }
) {
    const radius = 20

    if (options?.glow) {
        ctx.shadowColor = options.glow
        ctx.shadowBlur = options?.glowIntensity || 40
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 0
    }

    drawRoundedRect(ctx, x, y, width, height, radius)
    if (options?.gradient) {
        const grad = ctx.createLinearGradient(x, y, x + width, y + height)
        grad.addColorStop(0, options.gradient[0])
        grad.addColorStop(1, options.gradient[1])
        ctx.fillStyle = grad
    } else {
        ctx.fillStyle = 'rgba(20, 15, 30, 0.9)'
    }
    ctx.fill()

    ctx.shadowColor = 'transparent'
    ctx.shadowBlur = 0

    const highlightGrad = ctx.createLinearGradient(x, y, x, y + 60)
    highlightGrad.addColorStop(0, 'rgba(255, 255, 255, 0.08)')
    highlightGrad.addColorStop(1, 'transparent')
    drawRoundedRect(ctx, x, y, width, height, radius)
    ctx.fillStyle = highlightGrad
    ctx.fill()

    drawRoundedRect(ctx, x, y, width, height, radius)
    ctx.strokeStyle = options?.borderColor || 'rgba(255, 255, 255, 0.08)'
    ctx.lineWidth = 1
    ctx.stroke()
}

function drawStatCard(
    ctx: CanvasRenderingContext2D,
    cell: {x: number; y: number; width: number; height: number},
    emoji: string,
    value: string,
    label: string,
    colors: {gradient: [string, string]; border: string; glow: string}
) {
    drawCard(ctx, cell.x, cell.y, cell.width, cell.height, {
        gradient: colors.gradient,
        borderColor: colors.border,
        glow: colors.glow,
        glowIntensity: 25,
    })

    const centerX = cell.x + cell.width / 2
    const centerY = cell.y + cell.height / 2

    ctx.shadowColor = colors.glow
    ctx.shadowBlur = 20
    ctx.font = '42px system-ui'
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
    ctx.textAlign = 'center'
    ctx.fillText(emoji, centerX, centerY - 45)
    ctx.shadowBlur = 0

    ctx.font = 'bold 52px system-ui, -apple-system, sans-serif'
    ctx.fillStyle = '#ffffff'
    ctx.fillText(value, centerX, centerY + 20)

    ctx.font = '500 16px system-ui, -apple-system, sans-serif'
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
    ctx.fillText(label, centerX, centerY + 55)
}

export async function generateShareImage(data: ShareData): Promise<Blob> {
    const canvas = document.createElement('canvas')
    canvas.width = CARD_WIDTH
    canvas.height = CARD_HEIGHT
    const ctx = canvas.getContext('2d')!

    // === BACKGROUND ===
    const bgGradient = ctx.createRadialGradient(600, 600, 0, 600, 600, 900)
    bgGradient.addColorStop(0, '#141414')
    bgGradient.addColorStop(0.5, '#0a0a0a')
    bgGradient.addColorStop(1, '#000000')
    ctx.fillStyle = bgGradient
    ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT)

    const drawOrb = (x: number, y: number, radius: number, color: string) => {
        const orbGradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
        orbGradient.addColorStop(0, color)
        orbGradient.addColorStop(0.5, color.replace(/[\d.]+\)$/, '0.01)'))
        orbGradient.addColorStop(1, 'transparent')
        ctx.fillStyle = orbGradient
        ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT)
    }
    drawOrb(200, 200, 500, 'rgba(255, 255, 255, 0.03)')
    drawOrb(1000, 300, 450, 'rgba(255, 255, 255, 0.02)')
    drawOrb(400, 900, 500, 'rgba(255, 255, 255, 0.02)')
    drawOrb(900, 1000, 400, 'rgba(255, 255, 255, 0.015)')

    ctx.fillStyle = 'rgba(255, 255, 255, 0.008)'
    for (let i = 0; i < 150; i++) {
        const x = Math.random() * CARD_WIDTH
        const y = Math.random() * CARD_HEIGHT
        ctx.beginPath()
        ctx.arc(x, y, Math.random() * 1, 0, Math.PI * 2)
        ctx.fill()
    }

    const colors = {
        orange: {
            gradient: ['rgba(60, 60, 60, 0.6)', 'rgba(40, 40, 40, 0.6)'] as [string, string],
            border: 'rgba(255, 255, 255, 0.08)',
            glow: 'rgba(255, 255, 255, 0.05)',
        },
        purple: {
            gradient: ['rgba(55, 55, 55, 0.6)', 'rgba(35, 35, 35, 0.6)'] as [string, string],
            border: 'rgba(255, 255, 255, 0.08)',
            glow: 'rgba(255, 255, 255, 0.05)',
        },
        blue: {
            gradient: ['rgba(50, 50, 50, 0.6)', 'rgba(30, 30, 30, 0.6)'] as [string, string],
            border: 'rgba(255, 255, 255, 0.08)',
            glow: 'rgba(255, 255, 255, 0.05)',
        },
        green: {
            gradient: ['rgba(55, 55, 55, 0.6)', 'rgba(35, 35, 35, 0.6)'] as [string, string],
            border: 'rgba(255, 255, 255, 0.08)',
            glow: 'rgba(255, 255, 255, 0.05)',
        },
        pink: {
            gradient: ['rgba(65, 65, 65, 0.6)', 'rgba(45, 45, 45, 0.6)'] as [string, string],
            border: 'rgba(255, 255, 255, 0.1)',
            glow: 'rgba(255, 255, 255, 0.06)',
        },
        cyan: {
            gradient: ['rgba(50, 50, 50, 0.6)', 'rgba(30, 30, 30, 0.6)'] as [string, string],
            border: 'rgba(255, 255, 255, 0.08)',
            glow: 'rgba(255, 255, 255, 0.05)',
        },
    }

    // --- Row 0 ---

    // [0,0] Issues (1x1)
    drawStatCard(ctx, getCell(0, 0), '💬', formatNumber(data.issuesParticipated), data.labels.issues, colors.purple)

    // [1-2, 0] Title Card (2x1)
    const titleCell = getCell(1, 0, 2, 1)
    drawCard(ctx, titleCell.x, titleCell.y, titleCell.width, titleCell.height, {
        gradient: colors.pink.gradient,
        borderColor: colors.pink.border,
        glow: colors.pink.glow,
        glowIntensity: 50,
    })

    const titleCenterX = titleCell.x + titleCell.width / 2
    const titleCenterY = titleCell.y + titleCell.height / 2

    ctx.shadowColor = 'rgba(255, 255, 255, 0.3)'
    ctx.shadowBlur = 30
    ctx.font = '48px system-ui'
    ctx.fillStyle = '#ffffff'
    ctx.textAlign = 'center'
    ctx.fillText('🐙', titleCenterX, titleCenterY - 70)
    ctx.shadowBlur = 0

    ctx.font = 'bold 42px system-ui, -apple-system, sans-serif'
    ctx.fillStyle = '#ffffff'
    ctx.fillText('GitHub', titleCenterX, titleCenterY - 15)
    ctx.fillText('Wrapped', titleCenterX, titleCenterY + 35)

    ctx.font = 'bold 28px system-ui, -apple-system, sans-serif'
    const yearGrad = ctx.createLinearGradient(titleCenterX - 40, 0, titleCenterX + 40, 0)
    yearGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)')
    yearGrad.addColorStop(1, 'rgba(200, 200, 200, 0.9)')
    ctx.fillStyle = yearGrad
    ctx.fillText(data.year.toString(), titleCenterX, titleCenterY + 75)

    // [3, 0] Commits (1x1)
    drawStatCard(ctx, getCell(3, 0), '📝', formatNumber(data.commits), data.labels.commits, colors.blue)

    // --- Row 1 ---

    // [0, 1] PRs Created (1x1)
    drawStatCard(ctx, getCell(0, 1), '🚀', formatNumber(data.prsCreated), data.labels.prsCreated, colors.green)

    // [1, 1] PRs Merged (1x1)
    drawStatCard(ctx, getCell(1, 1), '✅', formatNumber(data.prsMerged), data.labels.prsMerged, colors.cyan)

    // [2-3, 1-2] Personality Card (2x2)
    const personalityCell = getCell(2, 1, 2, 2)
    drawCard(ctx, personalityCell.x, personalityCell.y, personalityCell.width, personalityCell.height, {
        gradient: colors.orange.gradient,
        borderColor: colors.orange.border,
        glow: colors.orange.glow,
        glowIntensity: 60,
    })

    const personalityCenterX = personalityCell.x + personalityCell.width / 2
    const personalityCenterY = personalityCell.y + personalityCell.height / 2

    ctx.fillStyle = 'rgba(255, 255, 255, 0.03)'
    ctx.beginPath()
    ctx.arc(personalityCell.x + personalityCell.width - 80, personalityCell.y + 80, 120, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(personalityCell.x + 60, personalityCell.y + personalityCell.height - 60, 100, 0, Math.PI * 2)
    ctx.fill()

    try {
        const avatar = await loadImage(data.avatarUrl)
        const avatarSize = 110
        const avatarX = personalityCenterX - avatarSize / 2
        const avatarY = personalityCenterY - 170

        ctx.shadowColor = 'rgba(255, 255, 255, 0.4)'
        ctx.shadowBlur = 30

        ctx.save()
        ctx.beginPath()
        ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2)
        ctx.closePath()
        ctx.clip()
        ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize)
        ctx.restore()

        ctx.shadowBlur = 0

        const ringGrad = ctx.createLinearGradient(avatarX, avatarY, avatarX + avatarSize, avatarY + avatarSize)
        ringGrad.addColorStop(0, 'rgba(255, 255, 255, 0.8)')
        ringGrad.addColorStop(1, 'rgba(180, 180, 180, 0.4)')
        ctx.strokeStyle = ringGrad
        ctx.lineWidth = 4
        ctx.beginPath()
        ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2 + 5, 0, Math.PI * 2)
        ctx.stroke()
    } catch {
        // Skip avatar if failed
    }

    ctx.font = 'bold 26px system-ui, -apple-system, sans-serif'
    ctx.fillStyle = '#ffffff'
    ctx.textAlign = 'center'
    ctx.fillText(`@${data.userName}`, personalityCenterX, personalityCenterY - 30)

    ctx.shadowColor = colors.orange.glow
    ctx.shadowBlur = 40
    ctx.font = '72px system-ui'
    ctx.fillText(data.developerTypeEmoji, personalityCenterX, personalityCenterY + 70)
    ctx.shadowBlur = 0

    ctx.font = 'bold 30px system-ui, -apple-system, sans-serif'
    const typeGrad = ctx.createLinearGradient(personalityCenterX - 100, 0, personalityCenterX + 100, 0)
    typeGrad.addColorStop(0, '#ffffff')
    typeGrad.addColorStop(1, '#cccccc')
    ctx.fillStyle = typeGrad
    ctx.fillText(data.developerType, personalityCenterX, personalityCenterY + 130)

    // --- Row 2-3 ---

    // [0-1, 2-3] 12-Month Graph (2x2)
    const graphCell = getCell(0, 2, 2, 2)
    drawCard(ctx, graphCell.x, graphCell.y, graphCell.width, graphCell.height, {
        gradient: ['rgba(45, 45, 45, 0.6)', 'rgba(25, 25, 25, 0.6)'],
        borderColor: 'rgba(255, 255, 255, 0.08)',
        glow: 'rgba(255, 255, 255, 0.04)',
        glowIntensity: 20,
    })

    ctx.font = 'bold 20px system-ui, -apple-system, sans-serif'
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
    ctx.textAlign = 'left'
    ctx.fillText('12 Months Activity', graphCell.x + 28, graphCell.y + 38)

    ctx.font = '500 14px system-ui, -apple-system, sans-serif'
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
    ctx.textAlign = 'right'
    ctx.fillText(`${formatNumber(data.commits)} total`, graphCell.x + graphCell.width - 28, graphCell.y + 38)

    const barAreaX = graphCell.x + 24
    const barAreaY = graphCell.y + 60
    const barAreaWidth = graphCell.width - 48
    const barAreaHeight = graphCell.height - 110
    const barWidth = (barAreaWidth - 11 * 8) / 12
    const maxCommits = Math.max(...data.monthlyCommits, 1)
    const peakMonthIndex = data.monthlyCommits.indexOf(Math.max(...data.monthlyCommits))

    data.monthlyCommits.forEach((count, index) => {
        const barHeight = Math.max((count / maxCommits) * (barAreaHeight - 35), 6)
        const x = barAreaX + index * (barWidth + 8)
        const y = barAreaY + barAreaHeight - 35 - barHeight
        const isPeak = index === peakMonthIndex && count > 0

        if (isPeak) {
            ctx.shadowColor = 'rgba(255, 255, 255, 0.3)'
            ctx.shadowBlur = 12
        }

        const barGradient = ctx.createLinearGradient(x, y, x, y + barHeight)
        if (isPeak) {
            barGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)')
            barGradient.addColorStop(1, 'rgba(200, 200, 200, 0.6)')
        } else {
            barGradient.addColorStop(0, 'rgba(150, 150, 150, 0.7)')
            barGradient.addColorStop(1, 'rgba(100, 100, 100, 0.35)')
        }
        ctx.fillStyle = barGradient
        drawRoundedRect(ctx, x, y, barWidth, barHeight, 5)
        ctx.fill()

        ctx.shadowBlur = 0

        ctx.font = '500 13px system-ui, -apple-system, sans-serif'
        ctx.fillStyle = isPeak ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.3)'
        ctx.textAlign = 'center'
        ctx.fillText(String(index + 1), x + barWidth / 2, barAreaY + barAreaHeight - 8)
    })

    // --- Row 3 remaining ---

    // [2, 3] Reviews (1x1)
    drawStatCard(ctx, getCell(2, 3), '👀', formatNumber(data.prsReviewed), data.labels.reviews, colors.orange)

    // [3, 3] Mentions (1x1)
    drawStatCard(ctx, getCell(3, 3), '📣', formatNumber(data.mentions), data.labels.mentions, colors.pink)

    // === FOOTER ===
    ctx.font = '500 15px system-ui, -apple-system, sans-serif'
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)'
    ctx.textAlign = 'right'
    ctx.fillText('github-recap.vercel.app', CARD_WIDTH - PADDING, CARD_HEIGHT - 12)

    return new Promise((resolve, reject) => {
        canvas.toBlob(
            (blob) => {
                if (blob) {
                    resolve(blob)
                } else {
                    reject(new Error('Failed to create blob'))
                }
            },
            'image/png',
            1.0
        )
    })
}

export async function downloadShareImage(data: ShareData): Promise<void> {
    const blob = await generateShareImage(data)
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `github-wrapped-${data.year}-${data.userName}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
}

export async function shareImage(data: ShareData): Promise<boolean> {
    if (!navigator.share) {
        return false
    }

    try {
        const blob = await generateShareImage(data)
        const file = new File([blob], `github-wrapped-${data.year}-${data.userName}.png`, {type: 'image/png'})

        await navigator.share({
            title: `${data.year} GitHub Wrapped`,
            text: `Check out my ${data.year} GitHub activity! ${data.commits} commits, ${data.prsCreated} PRs created 🚀`,
            files: [file],
        })
        return true
    } catch {
        return false
    }
}
