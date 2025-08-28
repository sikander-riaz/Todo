pipeline {
    agent any

    environment {
        IMAGE_NAME = 'your-dockerhub-username/todo-app'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/sikander-riaz/Todo.git'
            }
        }

        stage('Install Docker CLI') {
            steps {
                sh '''
                    apt-get update
                    apt-get install -y docker.io
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:latest .'
            }
        }

        stage('Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                        docker push $IMAGE_NAME:latest
                    '''
                }
            }
        }
    }
}
