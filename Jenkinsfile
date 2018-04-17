node {
	def emailList = 'fernando.jordan.silva@everis.com'
    def nodeHome = tool name: 'Node6.10', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
    env.PATH = "${nodeHome}/bin:${env.PATH}"

	def name = 'vged-table'
	def project_repo = 'https://git.volkswagengroup.es/vw-arch/vged-table.git'

	stage('Checkout') {
		checkout scm
		sh """
			git config user.email "jenkins@everis.com"
			git config user.name "Jenkins"
			git config push.default simple
		"""
	}

	stage('Install') {
		sh "npm install"
	}

	stage('Test') {
		sh "npm run test"
	}

	stage('Build') {
		sh "npm run build"
	}

	notifyBuild(currentBuild.result, emailList)
}

def notifyBuild(buildStatus, emailList) {
  // build status of null means successful
  buildStatus =  buildStatus ?: 'SUCCESSFUL'

  // Default values
  def colorName = 'RED'
  def colorCode = '#FF0000'

  // Override default values based on build status
  if (buildStatus == 'STARTED') {
    color = 'YELLOW'
    colorCode = '#FFFF00'
  } else if (buildStatus == 'SUCCESSFUL') {
    color = 'GREEN'
    colorCode = '#00FF00'
  } else {
    color = 'RED'
    colorCode = '#FF0000'
  }

  def subject = "${env.JOB_NAME} - Build #${env.BUILD_NUMBER} - ${buildStatus}!"
  def details = """<p>${env.JOB_NAME} - Build #${env.BUILD_NUMBER} - <b>${buildStatus}</b>.</p><p>Check attachment to view the results.</p>"""

  emailext (
		subject: subject,
		body: details,
		to: emailList,
		attachLog: true,
		recipientProviders: [[$class: 'DevelopersRecipientProvider']]
    )
}
