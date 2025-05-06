import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
	return (
		<div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
			{/* Navigator */}
			<header className="bg-gray-800 border-b border-gray-700 py-4">
				<div className="container mx-auto flex justify-between items-center">
					<h1 className="text-2xl font-semibold text-gray-100">
						Kingnnt.org
					</h1>
					<nav>
						<ul className="flex space-x-6 text-gray-400">
							<li>
								<a href="#home" className="hover:text-gray-100">
									Home
								</a>
							</li>
							<li>
								<a
									href="#about"
									className="hover:text-gray-100"
								>
									About
								</a>
							</li>
							<li>
								<a
									href="#contact"
									className="hover:text-gray-100"
								>
									Contact
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</header>

			{/* Main Content */}
			<main className="flex-grow container mx-auto py-16">
				<Card className="max-w-3xl mx-auto bg-gray-800 border border-gray-700 shadow-md">
					<CardHeader>
						<CardTitle className="text-center text-3xl font-medium text-gray-100">
							Welcome to Kingnnt.org
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="mb-6 text-lg text-gray-300">
							Kingnnt.org is Kingnnt Organization, an organization
							providing coding services.
						</p>
						<p className="text-gray-300">
							Kingnnt.org is dedicated to delivering high-quality
							coding solutions tailored to meet the unique needs
							of our clients. Our team of experienced developers
							specializes in creating robust, scalable, and
							efficient software applications. Whether you need
							web development, mobile app development, or custom
							software solutions, Kingnnt.org is here to help.
						</p>
					</CardContent>
				</Card>
			</main>

			{/* Footer */}
			<footer className="bg-gray-800 border-t border-gray-700 py-4">
				<div className="container mx-auto text-center text-gray-400">
					<p>&copy; 2025 Kingnnt.org. All rights reserved.</p>
				</div>
			</footer>
		</div>
	);
}
