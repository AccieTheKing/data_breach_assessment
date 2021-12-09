import React from 'react';
import { QuestionsComponentTest } from '../question/question.component';
import './styles.css';

enum ASSESSMENT_IMPACT_TITLE {
	LOW = 'LOW',
	MEDIUM = 'MEDIUM',
	HIGH = 'HIGH',
	CRITICAL = 'CRITICAL',
}

interface AssessmentData {
	assessmentNumber: number;
	assessmentDate: string;
	performedBy: string;
	result: number;
	impact_score: number;
}

const mockData: AssessmentData = {
	assessmentNumber: 1503,
	assessmentDate: new Date().toDateString(),
	performedBy: 'Stijn',
	result: 15,
	impact_score: 3,
};

const ImpactScoreVisual: React.FC<{ score: number }> = (props) => {
	// based on the score decide what value to show
	const title = Object.values(ASSESSMENT_IMPACT_TITLE)[props.score - 1];
	return (
		<div className='impact_card card'>
			<div className='impact_score_container'>
				<div className={`impact_score score_${title}`}>
					{mockData.impact_score}
				</div>
			</div>
			<h2 className='impact_title'>{title}</h2>
		</div>
	);
};

const Resultpage: React.FC = () => {
	return (
		<>
			<header className='container'>
				<div className='row'>
					<div className='col-12 col-lg-12'>
						<h1>Assessment result</h1>
					</div>
				</div>
				<div className='row'>
					<div className='col-12 col-lg-8 offset-lg-2'>
						<ImpactScoreVisual score={mockData.impact_score} />
					</div>
				</div>
				<div className='row'>
					<div className='col-12'>
						<div className='assessor_info_container'>
							<p>
								Assessment number: {mockData.assessmentNumber}
							</p>
							<p>Assessment date: {mockData.assessmentDate}</p>
							<p>Performed by: {mockData.performedBy}</p>
							<p>Result: {mockData.result}</p>
						</div>
					</div>
				</div>
			</header>
			<main className='container'>
				<div className='row'>
					<div className='col-12'>
						<QuestionsComponentTest />
					</div>
				</div>

				<div className='row'>
					<div className='col-12 col-lg-8 offset-lg-2'>
						<div className='action_list_container'>
							<h2>Action list</h2>
							<ol className='action_list'>
								<li>
									Lorem, ipsum dolor sit amet consectetur
									adipisicing elit. Beatae optio ducimus
									consequatur ullam aspernatur illum quia
								</li>
								<li>
									Lorem, ipsum dolor sit amet consectetur
									adipisicing elit. Beatae optio ducimus
									consequatur ullam aspernatur illum quia
								</li>
								<li>
									Lorem, ipsum dolor sit amet consectetur
									adipisicing elit. Beatae optio ducimus
									consequatur ullam aspernatur illum quia
								</li>
							</ol>
						</div>
					</div>
				</div>
			</main>
			<footer className='container'>
				<div className='row'></div>
			</footer>
		</>
	);
};

export default Resultpage;
