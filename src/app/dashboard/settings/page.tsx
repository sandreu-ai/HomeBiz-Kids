import { PageHeader } from "@/components/ui-custom/PageHeader";
import { FamilyEconomyForm } from "@/components/economy/FamilyEconomyForm";
import { DEMO_ECONOMY_SETTINGS } from "@/lib/demo-data";

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader
        title="Family Economy Settings"
        subtitle="Customize how work, rewards, and approvals function in your family"
      />

      <FamilyEconomyForm initial={DEMO_ECONOMY_SETTINGS} />
    </div>
  );
}
