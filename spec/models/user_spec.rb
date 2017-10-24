require 'rails_helper'

describe User do
  let(:user) do
    User.all.first
  end

  it 'pass first check point' do
    user.pass_check_point('start')
    expect(user.check_point_statuses.start.status).to eq 'pass'
  end

  it 'pass second check point' do
    user.pass_check_point('start')
    user.pass_check_point('middle')
    expect(user.check_point_statuses.start.status).to eq 'pass'
    expect(user.check_point_statuses.nth(2).status).to eq 'pass'
  end

  it 'pass all check point' do
    user.pass_check_point('start')
    user.pass_check_point('middle')
    user.pass_check_point('end')
    expect(user.check_point_statuses.start.status).to eq 'pass'
    expect(user.check_point_statuses.nth(2).status).to eq 'pass'
    expect(user.check_point_statuses.end.status).to eq 'pass'
    expect(user.state).to eq 'finished'
  end

  it 'user retire when not pass check point' do
    user.retire
    expect(user.state).to eq 'retire'
    user.check_point_statuses.each do |check_point_status|
      expect(check_point_status.status).to eq 'retire'
    end
  end

  it 'user retire after pass first check point' do
    user.pass_check_point('start')
    user.retire
    expect(user.state).to eq 'retire'
    expect(user.check_point_statuses.first.status).to eq 'pass'
    user.check_point_statuses.with_check_point_info.where.not(check_points: { previous_check_point: nil }).each do |check_point_status|
      expect(check_point_status.status).to eq 'retire'
    end
  end

  it 'user retire when finished' do
    user.pass_check_point('start')
    user.pass_check_point('middle')
    user.pass_check_point('end')
    expect(user.state).to eq 'finished'
    expect{ user.retire }.to raise_error(UserAlreadyFinishedError)
  end
end
