# Periscope

<p align="center">
  <a href="getperiscopedashboard.com">
 <img src="https://github.com/oslabs-beta/Periscope/raw/dev/dashboard/client/assets/periscopeLogo.png" alt="Periscope logo"></a>
</p>

<h3 align="center">Periscope Dashboard</h3>

<div align="center">

  [![Status](https://img.shields.io/badge/status-active-success.svg)]() 

</div>

---

<p align="center"> Periscope is the dashboard solution for monitoring and tracking your Kubernetes pods & nodes.
    <br> 
  <strong>[Visit us at getperiscopedashboard.com](http://getperiscopedashboard.com) </strong>
</p>

## 📝 Table of Contents
- [About](#about)
   - [Built Using](#built_using)
- [Demo](#demo)
- [Getting Started](#getting_started)
   - [Prerequisites](#prerequisites)
- [Authors](#authors)
- [Coming Soon](#coming_soon)

## 🧐 About <a name = "about"></a>
<p> Periscope is the dashboard solution for monitoring and tracking your Kubernetes pods & nodes. </p>

<p> Periscope integrates with a Prometheus server and then displays the core metrics that any engineer needs to understand the state and health of their cluster. 
Engineers can see CPU, disk usage and memory usage across their cluster. </p>

<p> The dashboard makes it easy to see troubling trends thereby providing developers with the information needed to make changes. </p>

### ⛏️ Built Using <a name = "built_using"></a>
- [Kubernetes](https://www.kubernetes.dev/)
- [Prometheus|PromQL](https://prometheus.io/)
- [React](https://reactjs.org)
- [NodeJS|Express](https://expressjs.com/)
- [Apollo GraphQL](https://www.apollographql.com/)
- [Recharts](https://recharts.org/en-US/)
- [React Table](https://react-table.tanstack.com/)
- [Webpack](https://webpack.js.org/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/)
- [Jest](https://jestjs.io/)



## 🎥 Demo <a name = "demo"></a>

<b> PUT IN GIF OF DASHBOARDD!! </b>


## 🏁 Getting Started <a name = "getting_started"></a>
Start by forking and cloning this repo. 

### Prerequisites <a name = "prerequisites"></a>
- Install the [kubectl](https://kubernetes.io/docs/tasks/tools) command line tools.
- Host your Kubernetes cluster on a service like [GKE](https://cloud.google.com/kubernetes-engine) or [EKS](https://aws.amazon.com/eks/) or use [MiniKube](https://minikube.sigs.k8s.io/docs/start).
- Install [the Prometheus server](https://prometheus-operator.dev/docs/prologue/quick-start/) in order to generate your metrics
  - Save your Prometheus server on the default namespace
- Then build and run the dashboard! 

## ✍️ Authors <a name = "authors"></a>
- Adda Kridler: [Github](https://github.com/addakridler) | [LinkedIn](https://www.linkedin.com/in/adda-kridler-23028887/)
- Junie Hou: [Github](https://github.com/selilac) | [LinkedIn](https://www.linkedin.com/in/juniehou/)
- Ronke Oyekunle: [Github](https://github.com/ronke11) | [LinkedIn](https://www.linkedin.com/in/royekunle)
- Shawn Convery: [Github](https://github.com/smconvery) | [LinkedIn](https://www.linkedin.com/in/shawn-convery-459b79167/)

## 🎉 Coming Soon! <a name = "coming_soon"></a>
- Set email / slack alerts for major changes in metrics
- Ability to enter your own PromQL query 
- Log History
