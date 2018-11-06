class User < ApplicationRecord
  validates :number, uniqueness: true

  has_many :check_point_statuses, dependent: :destroy

  STATE = [
    'joining',
    'retire',
    'finished'
  ]

  def pass_check_point(check_point_id)
    check_point_status = check_point_statuses.find_by(check_point_id: check_point_id)
    check_point_status.pass
    if check_point_statuses.not_pass.blank?
      update state: 'finished'
    end
  end

  def self.create_random_number
    set_number = SecureRandom.random_number(1 << 31)
    user = User.create(number: set_number)
    CheckPoint.sequence.each do |check_point|
      CheckPointStatus.create(user_id: user.id, check_point_id: check_point.id)
    end
    set_number
  rescue ActiveRecord::RecordInvalid
    retry
  end

  def retire
    if state == 'finished'
      raise UserAlreadyFinishedError
    end
    update state: 'retire'
    check_point_statuses.not_pass.map(&:retire)
  end

  def summary
    attributes.slice('id', 'number', 'state').merge(
      check_point_statuses: check_point_statuses.try(:sequence).filter(&:present?).map(&:summary)
    )
  end

  private

  def check_point_statuses
    @check_point_statuses ||= CheckPointStatus.where(user_id: id)
  end
end
