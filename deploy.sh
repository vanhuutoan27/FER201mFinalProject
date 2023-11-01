echo "Building app..."
npm run build
echo "Deploy files to server..."
# scp -r -i ~/Desktop/SWP391/4stu build/* root@157.245.196.103:/var/www/html/
scp -r -i ~/Desktop/SWP391/4stu build/* root@143.198.194.141:/var/www/html/
echo "Done!"