import React, { useState } from "react";
import { Card } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Separator } from "./components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs";
import {
  ArrowLeft,
  ExternalLink,
  Linkedin,
  Mail,
  MapPin,
  GraduationCap,
  Download,
  Github,
} from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";

// Project data structure
// 1. Dati sintetici per le card nella Home
const projects = {
  "medical-imaging": [
    {
      id: "retinal-segmentation",
      title: "Automatic Segmentation of Retinal Vessels",
      image: "mip_retina.png",
      description: "Deep Learning pipeline (U-Net) for clinical retinal vessel segmentation.",
      category: "Medical Image Processing",
    }
  ],
  "neuroengineering": [
    {
      id: "parkinson-signal-analysis",
      title: "Analysis of Electrophysiological Signals (MER)",
      image: "parkinson_waveforms.png",
      description: "Surgical Parkinson's treatment through STN localization and signal processing.",
      category: "Neuroengineering",
    }
  ],
  "rehabilitation": [
    {
      id: "semg-classification",
      title: "sEMG-Based Hand Movement Classification",
      image: "riab_prosthetic.jpg",
      description: "Myoelectric control system for prosthetic devices using kNN classification and electrode shift robustness analysis.",
      category: "Rehabilitation Engineering",
    }
  ]
};

const allProjects = Object.values(projects).flat();

// 2. Dettagli approfonditi dei progetti
const projectDetails = {
  "retinal-segmentation": {
    title: "Automatic Segmentation of Retinal Vessels for Clinical Applications",
    category: "Medical Image Processing",
    duration: "Academic Project — A.Y. 2025/2026",
    technologies: [
      "Python",
      "U-Net",
      "Deep Learning",
      "CLAHE",
      "Grey-World Normalization",
      "FOV Masking",
      "Morphological Post-processing",
      "Ablation Study",
    ],
    overview:
      "This project involved the development of an end-to-end deep learning pipeline designed for the automatic segmentation of retinal vessels. Given that the retina provides the only non-invasive view of the human vascular system, automating this task is essential for the large-scale screening of cardiovascular and neurodegenerative conditions. The system utilizes a 2D U-Net architecture, optimized through training on 600 high-resolution fundus images. To enhance the model's ability to generalize across different clinical settings, data augmentation was integrated into the training phase, alongside a rigorous split of training, validation, and test sets.",
    challenges:
      "A major challenge involved optimizing the preprocessing stage to handle heterogeneous fundus images, which often presented significant variations in brightness, contrast, and color balance. To address this, individual filters were evaluated through a systematic ablation study, assessing both their isolated and combined effects. Building on these results, the focus shifted to reducing the Skeleton Connectivity Error (SCE) to minimize vessel interruptions. This was achieved by testing multiple combinations of morphological post-processing strategies—such as closing, opening, and small object removal—to ensure lower SCE without degrading the Dice and clDice scores.",
    results:
      "By combining advanced preprocessing with a 4-layer deep U-Net, the pipeline achieved robust results on the test set (Dice: 0.85, clDice: 0.88). The addition of targeted morphological post-processing proved critical, resulting in a nearly eightfold reduction in connectivity errors (SCE = 0.86 vs. baseline 6.97). To further push the boundaries of the model, a patch-based training strategy was explored; this approach yielded a Dice score of 0.884 and proved particularly effective at capturing the fine details of thin vascular structures that are often lost in full-image processing.",
    images: [
      "mip_preprocessing.png",
      "mip_postprocessing.png",
    ],
    githubUrl: "",
    externalUrl: "https://drive.google.com/file/d/1RQ6oC-2qBuDZkWwdjncoqnn20j37WwKL/view?usp=share_link",
  },
  "parkinson-signal-analysis": {
    title: "STN-DBS MER Recordings: Intra- and Inter-Subject Analysis of Electrophysiological Features",
    category: "Neuroengineering",
    duration: "Academic Project — A.Y. 2025/2026",
    technologies: [
      "Python",
      "Signal Processing",
      "Spike Detection",
      "Pearson Correlation",
      "MER Analysis",
      "Statistical Evaluation",
    ],
    overview:
      "This study provides a systematic quantitative characterization of electrophysiological activity along the stereotactic trajectory, utilizing MicroElectrode Recordings (MERs) from 36 Parkinson’s Disease patients undergoing bilateral DBS surgery. The recordings, captured at multiple depths relative to the SubThalamic Nucleus (STN), were categorized as IN-STN or OUT-STN to facilitate precise anatomical mapping. To ensure signal integrity, a standardized processing pipeline was implemented, featuring robust artifact removal, bandpass filtering (200 Hz–5 kHz), and a dynamic spike detection method based on the Median Absolute Deviation (MAD).",
    challenges:
      "To address the challenges of noisy intraoperative recordings, a robust signal processing pipeline was developed with a focus on temporal continuity and noise reduction. Following variance-based artifact rejection, the system implemented a spike detection strategy using a 3σ threshold and a 1.5 ms refractory period to ensure reliable event identification. The resulting dataset was then characterized through a dual-feature extraction approach: spike-based metrics (including firing rate and burst percentage) were combined with spectral analysis across three high-frequency bands (200 Hz−5 kHz), providing a multi-dimensional view of the neural activity.",
    results:
      "Electrophysiological mapping identified IN-STN regions by their significantly higher firing rates and structured burst activity. A key finding of the study was the strong correlation between these signal features and clinical progression: as disease duration increased, firing rates and burst percentages showed a significant decline, while ISI-related metrics increased (p<0.01). These results suggest that the neurodegenerative process doesn't just affect the patient's symptoms, but leads to measurable, progressive alterations in the STN’s firing mechanisms, providing valuable quantitative markers for characterizing the state of the disease.",
    images: [
      "parkinson_waveforms.png",
    ],
    githubUrl: "",
    externalUrl: "https://drive.google.com/file/d/1fpoheE1EX5mdeILBkw3PqDNcv5nUbSS2/view?usp=share_link",
  },
  "semg-classification": {
    title: "sEMG-Based Hand Movement Classification for Myoelectric Prosthetic Control",
    category: "Rehabilitation Engineering",
    duration: "Academic Project — A.Y. 2025/2026",
    technologies: [
      "MATLAB",
      "kNN Classifier",
      "sEMG Processing",
      "Pattern Recognition",
      "Feature Extraction",
      "Cross-validation",
      "Electrode Shift Robustness",
    ],
    overview:
      "This project focused on the design and evaluation of a myoelectric classification system for hand and wrist movement recognition, with a specific focus on prosthetic control. High-density sEMG activity was acquired from the forearm using a 112-channel grid integrated into an elastic sleeve. To simulate a realistic prosthetic setup, four longitudinal single-differential (LSD) channels were strategically selected from this grid. The system utilized a kNN classifier trained on temporal features extracted from the EMG envelope, successfully discriminating between 12 distinct movement classes, ranging from complex wrist rotations to individual finger movements.",
    challenges:
      "A central challenge addressed in this project was the non-stationary nature of sEMG signals, particularly the issue of electrode shift. These small spatial displacements, common in daily use, can significantly degrade classifier performance. To mitigate this, a specialized feature set was designed for envelope-based signals, incorporating metrics such as Mean Value, I-EMG, Peak, and Time-to-Peak, alongside four comparative inter-phase features (including ΔMean and NormDiffMean). After optimizing the k parameter through 5-fold cross-validation, the training strategy was intentionally extended to include spatially shifted channel configurations (±1 position), a step that proved crucial for enhancing the system's real-world robustness.",
    results:
      "The results highlight the critical importance of training diversity in handling electrode displacement. While the baseline configuration initially struggled with spatial shifts, reaching only 35% accuracy, the inclusion of shifted signals in the training phase successfully stabilized performance at 87–94.4%. This robust foundation allowed for a further refinement of the sensor layout: through an iterative search, an optimal four-channel configuration was identified. By targeting the most relevant muscular areas, this optimized setup achieved near-perfect accuracy (98.6%) on nominal data and proved remarkably resilient to electrode shift, with performance staying above 96.7% even during spatial displacements.",
    images: [
      "riab_prosthetic.jpg",
    ],
    githubUrl: "",
    externalUrl: "https://docs.google.com/document/d/1A_rj1qM9lN3etFMNUK5VE0P4Qk3NPb1b/edit?usp=share_link&ouid=116390599301931860711&rtpof=true&sd=true",
  },
};

// 3. Componente Card
const ProjectCard = ({ project, onClick }) => (
  <Card
    className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow relative group"
    onClick={() => onClick(project.id)}
  >
    <div className="aspect-video overflow-hidden">
      <ImageWithFallback
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="p-6">
      <Badge variant="outline" className="mb-2 text-[10px] uppercase tracking-wider">
        {project.category}
      </Badge>
      <h4 className="mb-2 line-clamp-2">{project.title}</h4>
      <p className="text-muted-foreground text-sm line-clamp-2">
        {project.description}
      </p>
    </div>
  </Card>
);

// 4. Componente Principale App
export default function App() {
  const [currentView, setCurrentView] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);

  const navigateToProject = (projectId) => {
    setSelectedProject(projectId);
    setCurrentView("project");
    window.scrollTo(0, 0);
  };

  const navigateHome = () => {
    setCurrentView("home");
    setSelectedProject(null);
  };

  // VISTA DETTAGLIO PROGETTO
  if (currentView === "project" && selectedProject) {
    const project = projectDetails[selectedProject];
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-background border-b sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium">Jenny Tronconi</h2>
              <Button variant="ghost" onClick={navigateHome} className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <Badge variant="secondary" className="mb-4">{project.category}</Badge>
                <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
                <p className="text-lg text-muted-foreground leading-relaxed">{project.overview}</p>
              </div>

              <div className="space-y-4">
                {project.images.map((image, index) => (
                  <div key={index} className="rounded-xl overflow-hidden shadow-md">
                    <ImageWithFallback
                      src={image}
                      alt={project.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-8 pt-4">
                <div className="bg-slate-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">Challenges</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{project.challenges}</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">Results</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{project.results}</p>
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <Card className="p-6">
                <h4 className="font-bold mb-4 border-b pb-2">Technical Overview</h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-muted-foreground uppercase">Duration</label>
                    <p className="font-medium">{project.duration}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase">Core Technologies</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.technologies.map((tech, index) => (
                        <Badge key={index} variant="outline">{tech}</Badge>
                      ))}
                    </div>
                  </div>
                  {project.externalUrl && (
                    <div className="pt-2">
                      <Button variant="default" className="w-full" asChild>
                        <a href={project.externalUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Full Report
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </aside>
          </div>
        </div>
      </div>
    );
  }

  // VISTA HOME
  return (
    <div className="min-h-screen bg-background">
      {/* Header with Name */}
      <header className="bg-background">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <h1 className="text-4xl font-medium">Jenny Tronconi</h1>
        </div>
      </header>

      {/* Hero Section - Credentials and Image */}
      <section className="relative bg-gradient-to-br from-primary/5 to-secondary/10 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12">
            {/* Left side - Credentials and description */}
            <div className="flex-1 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <GraduationCap className="w-5 h-5" />
                  <span className="text-lg">
                    MSc Biomedical Engineering, Politecnico di Torino
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">
                    Faenza, Emilia-Romagna, Italy
                  </span>
                </div>
              </div>

              <p className="text-muted-foreground max-w-2xl text-lg">
                Biomedical Engineering Master’s student at Politecnico di Torino. Passionate about innovating in prosthetic design and medical data analysis to bridge the gap between advanced technology and clinical rehabilitation.
              </p>

              <div className="flex flex-wrap gap-3">
                <Button variant="default" asChild>
                  <a href="mailto:jennytronconi02@gmail.com">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Me
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/resume.pdf" download>
                    <Download className="w-4 h-4 mr-2" />
                    Resume
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href="https://www.linkedin.com/in/jenny-tronconi"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </a>
                </Button>
              </div>
            </div>

            {/* Right side - Square profile image */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-64 h-64 rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 shadow-lg">
                <img
                  src="/imports/905AAE68-564F-4B38-B64E-DAC6896CFA0A.jpg"
                  alt="Jenny Tronconi"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="mb-6">About Me</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I am a Biomedical Engineering Master's student at Politecnico di Torino,
                  deeply interested in the intersection of prosthetic design,
                  medical imaging, and rehabilitation technologies.
                </p>
                <p>
                  I am a curious and motivated person, always eager to learn and
                  challenge myself in dynamic environments. I value collaboration
                  and the exchange of ideas as key drivers for innovation in the MedTech sector.
                </p>
                <p>
                  Currently, I am seeking a Master's thesis opportunity where I can
                  contribute my enthusiasm and cross-functional skills to a
                  multidisciplinary team and further grow my expertise in medical data analysis.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="mb-3">Technical Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "MATLAB",
                    "Simulink",
                    "Python",
                    "C",
                    "Beta CAE System",
                    "Machine Learning",
                    "Deep Learning",
                    "Microsoft Office",
                    "AI tools"
                  ].map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="mb-3">Relevant Coursework</h4>
                <div className="grid grid-cols-1 gap-2 text-sm text-muted-foreground">
                  <span>• Biomechanics and Prosthetic Design</span>
                  <span>• Rehabilitation Engineering</span>
                  <span>• Medical Imaging</span>
                  <span>• Signal Processing</span>
                  <span>• Neuroengineering</span>
                  <span>• Brain-Computer Interfaces</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Projects Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="mb-12">Featured Projects</h2>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="flex w-fit mx-auto mb-8">
              <TabsTrigger value="all">All Projects</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={navigateToProject}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/50 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-muted-foreground mb-4">Contact me</p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" asChild>
              <a href="mailto:jennytronconi02@gmail.com">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a
                href="https://www.linkedin.com/in/jenny-tronconi"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}