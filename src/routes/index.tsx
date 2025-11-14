import { createFileRoute } from "@tanstack/react-router";
import YearRecap from '@/components/YearRecap';

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	// Default to current year
	return <YearRecap />;
}
