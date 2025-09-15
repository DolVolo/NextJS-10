import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { members } from "../members";

type MemberPageProps = {
	params: Promise<{ id: string }> | { id: string }; // Next 15 may pass a promise
};

export function generateStaticParams() {
	return members.map((m) => ({ id: String(m.id) }));
}

export async function generateMetadata({ params }: MemberPageProps) {
	const resolved = await Promise.resolve(params);
	const idNum = Number(resolved.id);
	const member = members.find((m) => m.id === idNum);
	return {
		title: member ? `${member.name} | Member ${member.id}` : "Member Not Found",
	};
}

export default async function MemberDetailPage({ params }: MemberPageProps) {
	const resolved = await Promise.resolve(params);
	const idNum = Number(resolved.id);
	const member = members.find((m) => m.id === idNum);
	if (!member) return notFound();

	const info = members.find(m => m.id === idNum);

	return (
		<div className="min-h-screen bg-gray-100 p-6">
			<div className="max-w-2xl mx-auto">
				<Link href="/member" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
					<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
					</svg>
					Back to members
				</Link>
				
				<div className="bg-white rounded-lg shadow">
					{/* Header */}
					<div className="p-6 border-b border-gray-200">
						<div className="flex items-center">
							{info?.image ? (
								<a
									 href={`https://avatar.vercel.sh/${info.image}.png`}
									 target="_blank"
									 rel="noopener noreferrer"
									 className="mr-4 relative w-16 h-16 rounded-full ring-2 ring-offset-2 ring-blue-500 overflow-hidden group"
									 title="Open full avatar"
								>
									<Image
										src={`https://avatar.vercel.sh/${info.image}.png`}
										alt={`${member.name} avatar`}
										fill
										sizes="64px"
										className="object-cover transition-transform group-hover:scale-105"
										priority
									/>
								</a>
							) : (
								<div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-4">
									<span className="text-white text-2xl font-bold">{member.id}</span>
								</div>
							)}
							<div>
								<h1 className="text-3xl font-bold text-black">{member.name}</h1>
								<p className="text-black">Member #{member.id}</p>
							</div>
						</div>
					</div>

					{/* Content */}
					<div className="p-6">
						{member.role && (
							<div className="mb-6 space-y-3">
								<span className="inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded-full">
									{member.role}
								</span>
								{info && (
									<div className="flex flex-wrap gap-3">
										<span className="inline-flex items-center gap-1 text-xs font-medium bg-gray-100 border px-3 py-1 rounded-full text-black">
											<svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c1.657 0 3-1.567 3-3.5S13.657 1 12 1s-3 1.567-3 3.5S10.343 8 12 8Zm0 0v13m5-6c0 3.314-2.239 6-5 6s-5-2.686-5-6" /></svg>
											Age: {info.age}
										</span>
										<span className="inline-flex items-center gap-1 text-xs font-medium bg-gray-100 border px-3 py-1 rounded-full text-black">
											<svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8M12 21V3m0 0L8 7m4-4 4 4" /></svg>
											Height: {info.height} cm
										</span>
									</div>
								)}
							</div>
						)}
						
						{info && (
							<>
								<div className="mb-6">
									<h2 className="text-xl font-semibold mb-3 text-black">Biography</h2>
									<p className="text-black leading-relaxed">{info.bio}</p>
								</div>
								
								<div>
									<h2 className="text-xl font-semibold mb-3 text-black">Key Skills</h2>
									<div className="flex flex-wrap gap-2">
										{info.skills.map((s) => (
											<span key={s} className="text-sm bg-gray-100 border px-3 py-1 rounded-lg text-black">
												{s}
											</span>
										))}
									</div>
								</div>
							</>
						)}
					</div>

					{/* Stats Footer */}
					<div className="border-t border-gray-200 bg-gray-50 p-6">
						<div className="grid grid-cols-3 gap-4 text-center">
							<div>
								<div className="text-2xl font-bold text-blue-600">12</div>
								<div className="text-sm text-gray-600">Albums</div>
							</div>
							<div>
								<div className="text-2xl font-bold text-green-600">200+</div>
								<div className="text-sm text-gray-600">Awards</div>
							</div>
							<div>
								<div className="text-2xl font-bold text-purple-600">2012</div>
								<div className="text-sm text-gray-600">Debut Year</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
