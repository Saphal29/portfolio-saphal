import { useTranslation } from "react-i18next"

export default function Skills() {
  const { t } = useTranslation()
  const technicalSkills = [
    "JavaScript",
    "Python",
    "Java",
    "React",
    "React Native",
    "Express.js",
    "HTML",
    "CSS",
    "Node.js",
    "MySQL",
    "JDBC",
  ]

  const softSkills = [
    "Communication Skills",
    "Teamwork & Collaboration",
    "Time Management",
    "Problem Solving",
    "Adaptability & Flexibility",
    "Leadership",
  ]

  return (
    <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t("skills.title")}</h1>
          <p className="text-lg text-gray-600">{t("skills.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t("skills.technical_skills")}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {technicalSkills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-blue-50 text-blue-800 px-4 py-2 rounded-lg text-center font-medium hover:bg-blue-100 transition-colors"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t("skills.soft_skills")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {softSkills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-green-50 text-green-800 px-4 py-2 rounded-lg text-center font-medium hover:bg-green-100 transition-colors"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Education & Certification */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">{t("skills.education_certifications")}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("skills.education_degree")}</h3>
              <p className="text-gray-600 mb-2">{t("skills.education_college")}</p>
              <p className="text-gray-600 mb-2">{t("skills.education_university")}</p>
              <p className="text-sm text-gray-500">{t("skills.education_date")}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("skills.aws_certification_title")}</h3>
              <p className="text-gray-600 mb-2">{t("skills.aws_certification_provider")}</p>
              <p className="text-sm text-gray-500">{t("skills.aws_certification_date")}</p>
              <a
                href="https://drive.google.com/file/d/1L1S2DCfmjQZOFftLoqkZMrNUwcDKN6j/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                {t("skills.view_certificate")}
              </a>
            </div>
          </div>
        </div>

        {/* Career Objective */}
        <div className="mt-16 bg-blue-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">{t("skills.career_objective")}</h2>
          <p className="text-gray-700 text-center max-w-4xl mx-auto leading-relaxed">
            {t("skills.career_objective_description")}
          </p>
        </div>
      </div>
    </div>
  )
}