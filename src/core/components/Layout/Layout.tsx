import React, { ComponentType } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { motion, MotionValue, useMotionValue, AnimatePresence, useTransform } from 'framer-motion'

import styles from './Layout.module.scss'

const links = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" }
]

const Link: React.FC<any> = ({ link, setTransform }: any) => {

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const textX = useTransform(x, latest => latest * .5)
    const textY = useTransform(y, latest => latest * .5)

    const location = useLocation()

    const MotionNavLink = motion(NavLink as ComponentType<any>)

    return (
        <motion.li
            onPointerMove={(event) => {
                setTransform(event.currentTarget, event, { x, y })
            }}
            onPointerLeave={(event) => {
                x.set(0)
                y.set(0)
            }}
            style={{ x, y }}
        >
            <MotionNavLink
                to={link.path}
            >
                <motion.span style={{ x: textX, y: textY }} className={styles.label}>{link.label}</motion.span>

                {location.pathname === link.path &&
                    <motion.div
                        transition={{ type: "spring" }}
                        layoutId='underline'
                        className={styles.active}
                    />
                }
            </MotionNavLink>
        </motion.li>
    )
}

const Layout: React.FC<LayoutProps> = (props) => {

    const mapRange = (inputLower: number, inputUpper: number, outputLower: number, outputUpper: number) => {
        const INPUT_RANGE = inputUpper - inputLower
        const OUTPUT_RANGE = outputUpper - outputLower

        return (value: number) => outputLower + (((value - inputLower) / INPUT_RANGE) * OUTPUT_RANGE || 0)
    }

    const setTransform = (item: HTMLElement & EventTarget, event: React.PointerEvent, motion: { x: MotionValue, y: MotionValue }) => {
        const bounds = item.getBoundingClientRect()
        const relativeX = event.clientX - bounds.left
        const relativeY = event.clientY - bounds.top
        const xRange = mapRange(0, bounds.width, -1, 1)(relativeX)
        const yRange = mapRange(0, bounds.height, -1, 1)(relativeY)

        motion.x.set(xRange * 10)
        motion.y.set(yRange * 10)


    }

    return (
        <>
            <nav className={styles.navWrapper}>
                <ul className={styles.nav}>
                    <AnimatePresence>
                        {links.map(link => {
                            return <Link link={link} setTransform={setTransform} key={link.path} />
                        })}
                    </AnimatePresence>
                </ul>
            </nav>

            <Outlet />
        </>
    )
}

interface LayoutProps {
    [key: string]: any
}

export default Layout;