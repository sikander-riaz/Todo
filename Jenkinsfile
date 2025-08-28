pipeline {
  agent any

  environment {
    DOCKER_IMAGE = 'siku9786/todo-app'
    DOCKER_CREDENTIALS_ID = 'dockerhub-credentials'  // Jenkins Credentials ID
  }

  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/sikander-riaz/Todo.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build App') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          dockerImage = docker.build("${DOCKER_IMAGE}:${env.BUILD_NUMBER}")
        }
      }
    }

    stage('Push to DockerHub') {
      steps {
        script {
          docker.withRegistry('', "${DOCKER_CREDENTIALS_ID}") {
            dockerImage.push()
            dockerImage.push('latest')
          }
        }
      }
    }
  }

  post {
    success {
      echo "Docker image pushed: ${DOCKER_IMAGE}:${env.BUILD_NUMBER}"
    }
    failure {
      echo "Build failed!"
    }
  }
}
