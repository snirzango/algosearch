import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import './index.css';
import Loader from 'react-loader-spinner';
import Layout from '../../components/layout';
import Breadcrumbs from '../../components/breadcrumbs';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class Block extends React.Component {
	constructor() {
		super();

		this.state = {
			blocknum: 0,
			data: [],
			loading: true,
		}
	}

	getBlock = blockNum => {
		axios({
			type: 'get',
			url: `http://localhost:8000/block/${blockNum}`
		}).then(response => {
			this.setState({data: response.data, loading: false});
		}).catch(error => {
			console.log(`Exception when retrieving block #${blockNum}: ${error}`)
		})
	}

	componentDidMount() {
		const { blocknum } = this.props.match.params;
		this.setState({blocknum: blocknum});
		document.title=`AlgoSearch | Block ${blocknum}`;
		this.getBlock(blocknum);
	}

	render() {
		return (
			<Layout>
				<Breadcrumbs
					name={`Block #${this.state.blocknum}`}
					parentLink="/blocks"
					parentLinkName="Blocks"
					currentLinkName={`Block #${this.state.blocknum}`}
				/>
				<div className="block-table">
					<span>Block Overview</span>
					<div>
						<table cellspacing="0">
							<thead>
								<tr>
									<th>Identifier</th>
									<th>Value</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Round</td>
									<td>{this.state.blocknum}</td>
								</tr>
								<tr>
									<td>Proposer</td>
									<td>{this.state.loading ? <Load/> : (<NavLink to={`/address/${this.state.data.proposer}`}>{this.state.data.proposer}</NavLink>)}</td>
								</tr>
								<tr>
									<td>Block hash</td>
									<td>{this.state.loading ? <Load/> : this.state.data.hash}</td>
								</tr>
								<tr>
									<td>Previous block hash</td>
									<td>{this.state.loading ? <Load/> : (<NavLink to={`/block/${parseInt(this.state.blocknum) - 1}`}>{this.state.data.previousBlockHash}</NavLink>)}</td>
								</tr>
								<tr>
									<td>Seed</td>
									<td>{this.state.loading ? <Load/> : this.state.data.seed}</td>
								</tr>
								<tr>
									<td>Created at</td>
									<td>{this.state.loading ? <Load/> : moment.unix(this.state.data.timestamp).format("LLLL")}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div className="block-table">
					<span>Governance Overview</span>
				{/*TODO: Transactions table */}
					<div>
						<table cellspacing="0">
							<thead>	
								<tr>
									<th>Identifier</th>
									<th>Value</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Current protocol</td>
									<td>{this.state.loading ? <Load/> : (<a href={this.state.data.currentProtocol} target="_blank" rel="noopener noreferrer">{this.state.data.currentProtocol}</a>)}</td>
								</tr>
								<tr>
									<td>Next protocol</td>
									<td>{this.state.loading ? <Load/> : this.state.data.nextProtocol}</td>
								</tr>
								<tr>
									<td>Next protocol approvals</td>
									<td>{this.state.loading ? <Load/> : this.state.data.nextProtocolApprovals}</td>
								</tr>
								<tr>
									<td>Next protocol vote before</td>
									<td>{this.state.loading ? <Load/> : this.state.data.nextProtocolVoteBefore}</td>
								</tr>
								<tr>
									<td>Next protocol switch on</td>
									<td>{this.state.loading ? <Load/> : this.state.data.nextProtocolSwitchOn}</td>
								</tr>
								<tr>
									<td>Upgrade proposal</td>
									<td>{this.state.loading ? <Load/> : this.state.data.upgradePropose}</td>
								</tr>
								<tr>
									<td>Upgrade approved</td>
									<td>{this.state.loading ? <Load/> : this.state.data.upgradeApprove}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</Layout>
		);
	}
}

class Load extends React.Component {
	render() {
		return (
			<Loader
				type="ThreeDots"
				color="#6984aa"
				className="loader"
				height={7}
			/>
		);
	}
}

export default Block;
