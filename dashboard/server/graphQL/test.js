[
  {
    "annotations":{
      "description": "KubeControllerManager has disappeared from Prometheus target discovery",

      "runbook_url":"https://github.com/kubernetes-monitoring/kubernetes-mixin/tree/master/runbook.md#alert-name-kubecontrollermanagerdown",

      "summary":"Target disappeared from Prometheus target discovery."
    },
  "endsAt":"2021-09-02T23:46:47.655Z",

  "fingerprint":"039ac84979615ef2",

  "receivers":[{"name":"null"}],

  "startsAt":"2021-09-01T14:24:47.655Z",

  "status":
    {
      "inhibitedBy":[],
      "silencedBy":[],
      "state":"active"
    },
  "updatedAt":"2021-09-02T23:42:47.659Z",

  "generatorURL":"http://prometheus-kube-prometheus-prometheus.default:9090/graph?g0.expr=absent%28up%7Bjob%3D%22kube-controller-manager%22%7D+%3D%3D+1%29\u0026g0.tab=1",

  "labels":
  {
    "alertname":"KubeControllerManagerDown",
    "prometheus":"default/prometheus-kube-prometheus-prometheus",
    "severity":"critical"
  }

}