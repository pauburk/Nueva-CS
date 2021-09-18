# nueva_cs

Assorted work for courses CS240 (Computer Security, taught by Wes Chao), CS280 (Computer Vision, taught by Wes Chao), CS320 (Intro ML, taught by Wes Chao), CS321 (Adv ML, taught by Wes Chao) at Nueva.
* [Machine Learning coursenotes](https://jennselby.github.io/MachineLearningCourseNotes/).
* [Computer Security coursenotes](https://jennselby.github.io/ComputerSecurityCourseNotes/).

__Install Homebrew and Python 3 in MacOS:__ [(link)](https://docs.python-guide.org/starting/install3/osx/)
1. Install command line tools: ```xcode-select --install```.
2. Install [Homebrew](https://brew.sh/): ```/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"```.
3. Update path for Homebrew: Add ```export PATH="/usr/local/opt/python/libexec/bin:$PATH"``` to the bottom of your ```~/.zshrc``` file.
4. Install Python 3: ```brew install python```
5. Install packages: ```python3 -m pip install <packagename>```.

__Create a virtual environment in MacOS:__ [(link)](https://docs.python.org/3/tutorial/venv.html)
1. Navigate to the project directory you want to create the virtual environment in.
2. Create a virtual environment: ```python3 -m venv <venvname>```.
3. Activate a virtual environment: ```source <venvname>/bin/activate```. To deactivate, type ```deactivate```.

__Adding a virtual environment as a Jupyter kernel:__ [(link)](https://queirozf.com/entries/jupyter-kernels-how-to-add-change-remove)
1. Activate the virtual environment: ```source <venvname>/bin/active```.
2. Install jupyter in the virtual environment: ```python3 -m pip install jupyter```.
3. Add the virtual environment as a kernel: ```ipython kernel install --name "<Kernel Name>" --user```.
