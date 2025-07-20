{
  "event": {
    "eventName": "Event Name",
    "cluster": "Cluster",
    "instance": "Node",
    "objectType": "Object Type",
    "severity": "Severity",
    "status": "Status",
    "duration": "Duration",
    "generatedAt": "Generated At"
  },
  "filters": {
    "active": "Active Alerts",
    "history": "Alerts History",
    "keyword": "Find by name",
    "cluster": "Cluster",
    "objectType": "Object Type",
    "severity": "Severity"
  },
  "listTable": {
    "mute": "Mute",
    "unmute": "Unmute",
    "unmuteSuccess": "{{eventName}} alert event is unmuted successfully"
  },
  "muteModal": {
    "title": "Mute <code>{{eventName}}</code>",
    "duration": "Mute duration",
    "successMsg": "{{eventName}} alert event is muted successfully"
  },
  "detail": {
    "title": "Alert Event Detail",
    "overview": "Overview",
    "details": "Details",
    "basicInfo": "Basic Information",
    "muteEvent": "Mute Event",
    "unmuteEvent": "Unmute Event",
    "expression": "Expression",
    "alertRule": "Alert rule",
    "expressionTester": "Expression Tester",
    "connectedMonitoringCharts": "Connected Monitoring Charts",
    "noChart": "No chart is connected to the current alert rule",
    "viewMoreMonitoring": "View more in Monitoring"
  }{
    "name": {
      "label": "Rule Name",
      "placeholder": "Please enter rule name",
      "required": "Please enter rule name",
      "maxLength": "Rule name should be less than 64 characters long",
      "pattern": "Rule name must start with a letter or underscore, and can only contain letters, numbers, underscores, and colons"
    },
    "expression": {
      "label": "Expression",
      "placeholder": "Please enter expression",
      "required": "Please enter expression"
    },
    "objectType": {
      "label": "Object Type",
      "placeholder": "Please select object type",
      "required": "Please select object type"
    },
    "severity": {
      "label": "Severity",
      "placeholder": "Please select severity",
      "required": "Please select severity"
    },
    "duration": {
      "label": "Duration"
    },
    "durationNum": {
      "placeholder": "Please enter duration"
    },
    "durationUnit": {
      "placeholder": "Please select duration unit"
    },
    "templates": {
      "label": "Bind Templates"
    },
    "monitoring": {
      "label": "Connect to Monitoring Charts",
      "placeholder": "Select one or more monitoring charts"
    },
    "keyword": {
      "label": "Find by name or expression"
    },
    "labels": {
      "label": "Labels",
      "addLabel": "Add Label",
      "keyPlaceholder": "Label key",
      "valuePlaceholder": "Label value",
      "keyRequired": "Please enter label key",
      "valueRequired": "Please enter label value",
      "reservedKey": "{{key}} is a reserved keyword"
    },
    "annotations": {
      "label": "Annotations",
      "summary": {
        "label": "Summary",
        "placeholder": "Please enter summary",
        "required": "Please enter summary"
      },
      "description": {
        "label": "Description",
        "placeholder": "Please enter description"
      },
      "addAnnotation": "Add Customized Annotations",
      "keyPlaceholder": "Annotations key",
      "valuePlaceholder": "Annotations value",
      "keyRequired": "Please enter annotations key",
      "valueRequired": "Please enter annotations value"
    },
    "expressionTester": {
      "title": "Expression Tester",
      "description": "This tester allows you to retrieve real-time data so that you can monitor whether the rule expression is effective.",
      "placeholder": "Write down any expression or data selectors here",
      "reset": "Reset to the Expression Entered",
      "clusterSelect": {
        "placeholder": "Select a cluster"
      },
      "loadData": "Load Data",
      "chartPlaceholder": "The chart of your expression will show up here if data is retrieved successfully."
    },
    "creator": "Creator",
    "createRule": "Create Rule",
    "importRules": "Import Rules from Cluster",
    "editRule": "Edit Rule",
    "duplicateRule": "Duplicate Rule",
    "viewPrometheus": "View Prometheus Configuration",
    "backToEdit": "Back to Edit",
    "createAlertRule": "Create Alert Rule",
    "updateAlertRule": "Update Alert Rule",
    "viewDetail": "View Detail",
    "deletion": {
      "title": "Delete Alert Rule <code>{{name}}</code>",
      "enterName": "Please enter alert rule name",
      "toDelete": "to delete.",
      "required": "Please enter alert rule name",
      "invalid": "Invalid alert rule name",
      "confirmText": "Are you sure you want to delete this rule?",
      "message": {
        "success": "Alert rule {{ruleName}} is deleted successfully",
        "hasBoundTemplates_one": "This alert rule is used by {{count}} alert rule template. Deleting this rule will remove its presence from all of the templates, but the clusters which had used those templates won't be affected.",
        "hasBoundTemplates_other": "This alert rule is used by {{count}} alert rule templates. Deleting this rule will remove its presence from all of the templates, but the clusters which had used those templates won't be affected."
      }
    },
    "batchDeletion": {
      "title": "Delete Alert Rules",
      "btnText_one": "Delete {{count}} Rule",
      "btnText_other": "Delete {{count}} Rules",
      "boundTemplatesTip": "If alert rules are bound by alert rule templates, deleting these rules will remove their presence from all of the templates, but the clusters which had used those templates won't be affected.",
      "confirmText_one": "Are you sure you want to delete the selected 1 rule?",
      "confirmText_other": "Are you sure you want to delete the selected {{count}} rules?",
      "message": {
        "success_one": "1 alert rule is deleted successfully",
        "success_other": "{{count}} alert rules are deleted successfully"
      }
    },
    "detail": {
      "title": "Alert Rule Detail"
    },
    "reload": {
      "message_one": "There is 1 alert rule updated but haven't been effective. Please reload Prometheus to apply the change.",
      "message_other": "There are {{count}} alert rules updated but haven't been effective. Please reload Prometheus to apply these changes.",
      "action": "Reload Prometheus"
    },
    "reloadModal": {
      "step1": {
        "title": "Confirm the updates",
        "desc": "Reloading Prometheus updates its alert rules. Alert rules take effect immediately after reloading.",
        "confirmContinue": "Confirm and continue"
      },
      "step2": {
        "title": "Reload Prometheus",
        "desc": "To confirm, type <code>{{cmd}}</code> in the input box below.",
        "inputPlaceholder": "Type \"{{cmd}}\""
      },
      "result": {
        "success": "Prometheus reload initiated. Alert rules changes are being applied. <linkHref>View task details</linkHref>"
      }
    },
    "changeType": {
      "label": "Change Type",
      "create": "New",
      "update": "Update",
      "delete": "Delete",
      "enable": "Enable",
      "disable": "Disable",
      "unknown": "Unknown"
    },
    "submissionTime": {
      "label": "Submission Time"
    },
    "importDrawer": {
      "info": "You can only import alert rules from one cluster at a time.",
      "cluster": "Cluster",
      "import_zero": "Start Import",
      "import_one": "Start Import (1)",
      "import_other": "Start Import ({{count}})",
      "importAll_zero": "Import All",
      "importAll_other": "Import All ({{count}})",
      "success": "Import alert rules successfully"
    }
  }
}