pipeline {
    agent { label 'agent' }

    // tools {
    //     jdk 'jdk17'
    //     nodejs 'node20'
    // }

    environment {
        IMAGE_NAME = 'siku9786/todo-app'   // Replace with your actual image name
        IMAGE_TAG = 'latest'               // Or dynamically set this later
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/sikander-riaz/Todo'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh "npm install || true"
            }
        }

        stage('SonarQube Scan') {
            environment {
                scannerHome = tool 'sonar-scanner'
            }
            steps {
                withSonarQubeEnv('sonarqube') {
                    sh """
                        ${scannerHome}/bin/sonar-scanner \\
                        -Dsonar.projectKey=todo-app \\
                        -Dsonar.projectName=todo-app \\
                        -Dsonar.sources=. \\
                        -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
                    """
                }
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                    docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
                '''
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'docker-hub-token', variable: 'DOCKER_TOKEN')]) {
                    sh '''
                        echo "${DOCKER_TOKEN}" | docker login -u siku9786 --password-stdin
                        docker push ${IMAGE_NAME}:${IMAGE_TAG}
                    '''
                }
            }
        }
    }
}
