#!/bin/bash
#
# this script helps us use yarn scripts with pre-commit.  pre-commit helpfully passes
# us repo-relative paths to the shell commands it invokes.  however, our yarn commands
# expect not a repo-relative path but instead a package-relative path.
#
# here's an example to illustrate:
#
# $ ./scripts/pre_commit.sh frontend "yarn prettier --write" frontend/.eslintrc.js
#
# is transformed into the following command run inside `frontend`:
#
# $ yarn prettier --write .eslintrc.js
#
# More pre-commit docs here: https://pre-commit.com/

set -euf -o pipefail

SUBDIR=$1
shift
SUBDIR_SCRIPT=$1
shift
FILES=$*

echo script is $SUBDIR_SCRIPT
echo subdir is $SUBDIR

SUBDIR_STRIPPED_FILES=${FILES//$SUBDIR\//}

cd $SUBDIR
$SUBDIR_SCRIPT $SUBDIR_STRIPPED_FILES
