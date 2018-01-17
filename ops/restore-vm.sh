#!/usr/bin/env bash
set -x
VBoxManage controlvm debian-mini acpipowerbutton
sleep 5
VBoxManage snapshot debian-mini restorecurrent
sleep 5
VBoxManage startvm debian-mini --type headless
sleep 10

