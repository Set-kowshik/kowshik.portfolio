import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const CaseStudy = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const caseStudyMap: Record<string, string> = {
    'localhub': '/case-studies/localhub.html',
    'wellness-companion': '/case-studies/wellness-companion.html',
    'veriwear': '/case-studies/veriwear.html',
  };

  const caseStudyPath = id ? caseStudyMap[id] : null;

  useEffect(() => {
    if (!caseStudyPath) {
      navigate('/404');
    }
  }, [caseStudyPath, navigate]);

  if (!caseStudyPath) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-6 left-6 z-50">
        <Button
          onClick={() => navigate('/')}
          variant="glass"
          size="sm"
          className="backdrop-blur-lg border-white/20 hover:bg-white/20"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Portfolio
        </Button>
      </div>
      <iframe
        src={caseStudyPath}
        title="Case Study"
        className="w-full h-screen border-0"
        style={{ display: 'block' }}
      />
    </div>
  );
};

export default CaseStudy;
