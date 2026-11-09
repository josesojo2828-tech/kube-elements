.PHONY: test serve image

test:
	node tests/validate-data.js

serve:
	python3 -m http.server 8000

image:
	docker build -t kube-elements:local .
