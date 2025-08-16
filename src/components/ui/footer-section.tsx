'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { FacebookIcon, FrameIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from 'lucide-react';
import { Squares } from '@/components/ui/squares-background';

interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
	label: string;
	links: FooterLink[];
}

const footerLinks: FooterSection[] = [
	{
		label: 'Company',
		links: [
			{ title: 'Home', href: '#home' },
			{ title: 'About', href: '#about' },
			{ title: 'Services', href: '#services' },
			{ title: 'Calendar', href: '#calendar' },
		],
	},
	{
		label: 'Social Links',
		links: [
			{ title: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61551834612654', icon: FacebookIcon },
			{ title: 'Instagram', href: 'https://www.instagram.com/sallink.pt/', icon: InstagramIcon },
			{ title: 'Youtube', href: 'https://www.youtube.com/@Sallinkagency', icon: YoutubeIcon },
			{ title: 'LinkedIn', href: 'https://www.linkedin.com/company/sallink-agency/?viewAsMember=true', icon: LinkedinIcon },
		],
	},
];

export function Footer() {
	const shouldReduceMotion = useReducedMotion();

	return (
		<footer className="relative w-full flex flex-col items-center justify-center rounded-t-4xl md:rounded-t-6xl border-t border-white/10 bg-[#060606] px-6 py-12 lg:py-16 overflow-hidden">
			{/* Squares Background */}
			{!shouldReduceMotion && (
				<Squares 
					direction="diagonal"
					speed={0.5}
					squareSize={40}
					borderColor="#333" 
					hoverFillColor="#222"
					className="absolute top-0 left-0 w-full h-full"
				/>
			)}

			<div className="relative z-10 w-full max-w-7xl mx-auto">
						<div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
				<AnimatedContainer className="space-y-4">
					<img src="/logo.svg" alt="Company Logo" className="h-8 w-auto" />
					<p className="text-muted-foreground mt-8 text-sm md:mt-0">
						&copy; 2024 Sallink. All rights reserved.
					</p>
				</AnimatedContainer>

				<div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-2 xl:col-span-2 xl:mt-0">
					{footerLinks.map((section, index) => (
						<AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
							<div className="mb-10 md:mb-0">
								<h3 className="text-xs">{section.label}</h3>
								<ul className="text-muted-foreground mt-4 space-y-2 text-sm">
									{section.links.map((link) => (
										<li key={link.title}>
											<a
												href={link.href}
												className="hover:text-foreground inline-flex items-center transition-all duration-300"
											>
												{link.icon && <link.icon className="me-1 size-4" />}
												{link.title}
											</a>
										</li>
									))}
								</ul>
							</div>
						</AnimatedContainer>
					))}
				</div>
				</div>
			</div>
		</footer>
	);
}

type ViewAnimationProps = {
	delay?: number;
	className?: ComponentProps<typeof motion.div>['className'];
	children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return children;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
}
