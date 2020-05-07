import React from 'react'
import './AssignQuiz.scss'
import JoinNav from '../Nav/Nav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import InterviewControl from '../../HR/Campaign/Interview/Control/Control'

class AssignQuiz extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isTop: true,
			interviews: [
				{
					id: 0,
					name: "",
					date: "2020-01-01",
					time: "12:00:00",
					campaign_id: "",
					group_candidates: [
						{
							candidate_id: 0,
							cv: "",
							description: "",
							interview_time: "12:00:00",
							user: {
								id: 0,
								name: "",
								email: "",
								phone: "",
							},
						},
					],
				},
			],
		}
	}


	componentDidMount() {
		document.addEventListener('scroll', this.shrinkHeaderHeight);
		//window.onscroll = this.shrinkHeaderHeight;
	}

	componentWillUnmount() {
		document.removeEventListener('scroll', this.shrinkHeaderHeight);
		//document.removeEventListener('scroll', this.resizeHeaderOnScroll);

	}

	shrinkHeaderHeight = () => {
		//const isTop = document.body.scrollTop > 200 || document.documentElement.scrollTop > 200;
		if (window.scrollY < 440) {
			this.setState({
				isTop: true
			})
		}
		else {
			this.setState({
				isTop: false
			})
		}
	}
	render() {
		let title = "Campaing title"
		let { interviews, isTop } = this.state
		return (
			<div className="assign-quiz-container d-flex flex-column">
				<JoinNav />

				{/* <div className="assign-quiz-cover-nav"
					style={isTop ? { display: 'none' } : { display: 'block' }}
				></div> */}
				<div
					className={isTop ? "assign-quiz-header" : "assign-quiz-header"}
				>
					<div className="row" style={{ height: '100%' }}>
						<div className="col-sm-2" style={{ height: '100%' }}></div>
						<div className="col-lg-8" style={{ height: '100%' }}>

							<div className="assign-quiz-cover-img-crop"
								style={isTop ? {} : { display: 'none' }}
							>
								<img className="assign-quiz-cover-img"
									alt="cover"
									src={require("../../HR/images/covercampaign.png")}
								/>
							</div>

							<div className="assign-quiz-cover-info d-flex flex-row justify-content-center align-items-center">
								<img alt="campaign" className="desc-campaign-img"
									src={require("../../HR/images/Interview.png")}
								/>

								<div className="aq-campaign-title-and-apply flex-grow-1">
									<h3>Campaign Title</h3>
									<p>10 candidates applied</p>
								</div>
								<div className="aq-campaign-position-and-subject d-flex flex-row">
									<div className="aq-position">
										Senior
									</div>
									<div className="aq-subject">
										Java
									</div>
								</div>
							</div>

						</div>
						<div className="col-sm-2" style={{ height: '100%' }}></div>
					</div>
				</div>

				<div className="row">
					<div className="col-sm-2"></div>
					<div className="col-lg-6">
						<div className="assign-quiz-editor">


							<div className="assign-quiz-interviews-container">
								<div className="assign-quiz-interviews-header">
									Interviews
								</div>
								<div className="assign-quiz-interviews-list">
									<InterviewControl data={interviews[0]} />
									<InterviewControl data={interviews[0]} />
									<InterviewControl data={interviews[0]} />
									<InterviewControl data={interviews[0]} />
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-2">
						<div className="assign-quiz-create-container"
							style={isTop ? {} : { position: 'sticky', top: '60px', width: '280px' }}
						>
							<div className="assign-quiz-create-header">
								Campaign quiz
                                </div>
							<div className="assign-quiz-create d-flex flex-column align-items-center"
							>
								<b>
									No quiz for this recruitment yet
								</b>
								<img alt="quiznull"
									className="aq-quiz-null-img"
									src={require("../../HR/images/quiznull.png")}
								/>
								<button className="assign-create-quiz-btn">
									<span><FontAwesomeIcon icon={faPlusCircle} />Create quiz</span>
								</button>
							</div>
						</div>
					</div>
					<div className="col-sm-2"></div>
				</div>

			</div >
		);
	}
}

export default AssignQuiz;