require 'rails_helper'

describe CheckPointStatus do
  let(:user) do
    User.all.first
  end

  it 'pass' do
    user.check_point_statuses.start.pass
    expect(user.check_point_statuses.start.status).to eq 'pass'
  end

  it 'pass when previous hceck point not pass' do
    expect{ user.check_point_statuses.nth(2).pass }.to raise_error(PreviousCheckPointNotPassError)
  end
end
