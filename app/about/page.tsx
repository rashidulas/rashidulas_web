import { ExperienceSection } from "@/components/ExperienceSection";
import ProfileSection from "@/components/ProfileSection";
import { EducationSection } from "@/components/EducationSection";
// import { ExperienceSection } from "./components/ExperienceSection";
// import { WorkSection } from "./components/WorkSection";
// import { EducationSection } from "./components/EducationSection";

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <ProfileSection />
      <div className="section-divider"></div>
      <ExperienceSection />
      {/* <div className="section-divider"></div>
      <WorkSection /> */}
      <div className="section-divider"></div>
      <EducationSection />
    </div>
  );
}
