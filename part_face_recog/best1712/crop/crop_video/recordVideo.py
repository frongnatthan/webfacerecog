import cv2

cap = cv2.VideoCapture('rtsp://admin:kusrc12345@158.108.122.7:554/stream')

# Define the codec and create VideoWriter object
fourcc = cv2.VideoWriter_fourcc(*'MP4V') #(*'MP42')
out = cv2.VideoWriter('output2.mp4', fourcc, 20.0, (640, 480))

while cap.isOpened():
    ret, frame = cap.read()
    if ret:

        frame = cv2.resize(frame, (640, 480))

        out.write(frame)
        cv2.imshow('Video', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    else:
        break

# Release everything if job is finished
cap.release()
out.release()
cv2.destroyAllWindows()
